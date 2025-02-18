const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Gadget = sequelize.define('Gadget', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('Available', 'Deployed', 'Destroyed', 'Decommissioned'),
    defaultValue: 'Available',
  },
  decommissionedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  missionCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  lastMissionDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  reliability: {
    type: DataTypes.FLOAT,
    defaultValue: 0.8
  },
  decommissionReason: {
    type: DataTypes.STRING,
    allowNull: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  powerLevel: {
    type: DataTypes.INTEGER,
    defaultValue: 100,
    validate: {
      min: 0,
      max: 100
    }
  },
  lastMaintenanceDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  nextMaintenanceDue: {
    type: DataTypes.DATE,
    allowNull: true
  },
  category: {
    type: DataTypes.ENUM('Surveillance', 'Infiltration', 'Combat', 'Transport', 'Communication'),
    allowNull: false,
    defaultValue: 'Surveillance'
  },
  technicalSpecs: {
    type: DataTypes.JSONB,
    defaultValue: {}
  }
}, {
  tableName: 'Gadgets',
  timestamps: true
});

module.exports = Gadget;
