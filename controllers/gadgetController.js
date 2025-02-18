const Gadget = require('../models/gadget');
const { v4: uuidv4 } = require('uuid');
const logger = require('../utils/logger');
const { Op } = require('sequelize');

const calculateSuccessProbability = (gadget) => {
  const baseProb = gadget.reliability * 100;
  const missionPenalty = gadget.missionCount * 2;
  const powerPenalty = (100 - gadget.powerLevel) * 0.5;
  const maintenancePenalty = gadget.nextMaintenanceDue && new Date() > new Date(gadget.nextMaintenanceDue) ? 15 : 0;
  
  const finalProb = Math.max(0, Math.min(100, baseProb - missionPenalty - powerPenalty - maintenancePenalty));
  return `${Math.round(finalProb)}%`;
};

const scheduleNextMaintenance = (gadget) => {
  const missionThreshold = 5;
  if (gadget.missionCount >= missionThreshold) {
    gadget.nextMaintenanceDue = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
  }
};

// GET /gadgets - Get all gadgets with success probability
const getGadgets = async (req, res) => {
  try {
    const gadgets = await Gadget.findAll({
      where: {
        status: req.query.status || { [Op.ne]: 'Destroyed' }
      },
      attributes: [
        'id', 'name', 'status', 'decommissionedAt', 'createdAt', 'updatedAt',
        'missionCount', 'lastMissionDate', 'reliability', 'decommissionReason', 'powerLevel', 'nextMaintenanceDue'
      ]
    });
    logger.info(`Retrieved ${gadgets.length} gadgets`);
    const gadgetsWithProbability = gadgets.map(gadget => ({
      ...gadget.dataValues,
      missionSuccessProbability: calculateSuccessProbability(gadget)
    }));
    res.json(gadgetsWithProbability);
  } catch (err) {
    logger.error('Error retrieving gadgets:', err);
    res.status(500).json({ 
      error: 'Failed to retrieve gadgets',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

// POST /gadgets - Add a new gadget
const addGadget = async (req, res) => {
  const { name, category, description, technicalSpecs } = req.body;
  const codename = `The ${name || 'Unnamed'} ${Math.random().toString(36).substring(7)}`;
  
  try {
    const newGadget = await Gadget.create({
      name: codename,
      status: 'Available',
      category: category || 'Surveillance',
      description,
      technicalSpecs,
      powerLevel: 100,
      missionCount: 0,
      lastMaintenanceDate: new Date(),
      nextMaintenanceDue: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      reliability: 0.8
    });
    
    logger.info(`New gadget created: ${codename}`);
    res.status(201).json(newGadget);
  } catch (err) {
    logger.error('Error creating gadget:', err);
    res.status(500).json({ error: 'Failed to add gadget' });
  }
};

// PATCH /gadgets/:id - Update gadget
const updateGadget = async (req, res) => {
  const { id } = req.params;
  const { name, status, missionCount, lastMissionDate, decommissionReason } = req.body;
  try {
    const gadget = await Gadget.findByPk(id);
    if (!gadget) {
      return res.status(404).json({ error: 'Gadget not found' });
    }

    // Update only provided fields
    if (name) gadget.name = name;
    if (status) {
      gadget.status = status;
      if (status === 'Deployed') {
        gadget.lastMissionDate = new Date();
        gadget.missionCount += 1;
        scheduleNextMaintenance(gadget);
      }
    }
    if (missionCount !== undefined) gadget.missionCount = missionCount;
    if (lastMissionDate) gadget.lastMissionDate = lastMissionDate;
    if (decommissionReason) gadget.decommissionReason = decommissionReason;

    await gadget.save();
    logger.info(`Gadget updated: ${id}`);
    res.json(gadget);
  } catch (err) {
    logger.error(`Error updating gadget ${id}:`, err);
    res.status(500).json({ error: 'Failed to update gadget' });
  }
};

// DELETE /gadgets/:id - Decommission gadget
const deleteGadget = async (req, res) => {
  const { id } = req.params;
  const { reason } = req.body;
  try {
    const gadget = await Gadget.findByPk(id);
    if (!gadget) {
      return res.status(404).json({ error: 'Gadget not found' });
    }
    
    await gadget.update({
      status: 'Decommissioned',
      decommissionedAt: new Date(),
      decommissionReason: reason || 'Standard decommission procedure'
    });
    
    logger.info(`Gadget decommissioned: ${id}`);
    res.json(gadget);
  } catch (err) {
    logger.error(`Error decommissioning gadget ${id}:`, err);
    res.status(500).json({ error: 'Failed to decommission gadget' });
  }
};

// POST /gadgets/:id/self-destruct - Trigger self-destruct
const selfDestruct = async (req, res) => {
  const { id } = req.params;
  try {
    const gadget = await Gadget.findByPk(id);
    if (!gadget) {
      return res.status(404).json({ error: 'Gadget not found' });
    }
    
    const confirmationCode = Math.random().toString(36).substring(7);
    await gadget.update({ 
      status: 'Destroyed',
      decommissionReason: 'Self-destructed',
      decommissionedAt: new Date()
    });
    
    logger.warn(`Self-destruct initiated for gadget ${id}`);
    res.json({ confirmationCode, message: 'Self-destruct sequence initiated' });
  } catch (err) {
    logger.error(`Self-destruct failed for gadget ${id}:`, err);
    res.status(500).json({ error: 'Self-destruct sequence failed' });
  }
};

// POST /gadgets/:id/maintenance - Perform maintenance
const performMaintenance = async (req, res) => {
  const { id } = req.params;
  try {
    const gadget = await Gadget.findByPk(id);
    if (!gadget) {
      return res.status(404).json({ error: 'Gadget not found' });
    }

    gadget.powerLevel = 100;
    gadget.lastMaintenanceDate = new Date();
    gadget.nextMaintenanceDue = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    gadget.reliability = Math.min(1, gadget.reliability + 0.1);

    await gadget.save();
    logger.info(`Maintenance performed on gadget: ${id}`);
    res.json(gadget);
  } catch (err) {
    logger.error(`Maintenance failed for gadget ${id}:`, err);
    res.status(500).json({ error: 'Maintenance failed' });
  }
};

module.exports = { getGadgets, addGadget, updateGadget, deleteGadget, selfDestruct, performMaintenance };
