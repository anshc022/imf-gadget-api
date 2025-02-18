require('dotenv').config();
const { sequelize } = require('../config/database');
const Gadget = require('../models/gadget');

const sampleGadgets = [
  {
    name: 'The Chameleon Cloak X-19',
    status: 'Available',
    reliability: 0.95,
    category: 'Infiltration',
    powerLevel: 100,
    description: 'Advanced adaptive camouflage suit with thermal masking',
    technicalSpecs: {
      powerSource: 'Quantum Battery',
      activeTime: '6 hours',
      weight: '2.5kg',
      dimensions: '40x60x10cm'
    }
  },
  {
    name: 'The Neural Interceptor v2',
    status: 'Deployed',
    reliability: 0.85,
    missionCount: 3,
    lastMissionDate: new Date(),
    category: 'Surveillance',
    powerLevel: 80,
    description: 'Mind-reading device disguised as regular earbuds',
    technicalSpecs: {
      powerSource: 'Neural Battery',
      activeTime: '8 hours',
      weight: '0.1kg',
      dimensions: '2x2x2cm'
    }
  },
  {
    name: 'The Quantum Decoder mk2',
    status: 'Available',
    reliability: 0.90,
    missionCount: 1,
    category: 'Cryptography',
    powerLevel: 90,
    description: 'Universal cryptographic solution with quantum computing core',
    technicalSpecs: {
      powerSource: 'Quantum Battery',
      activeTime: '12 hours',
      weight: '1.5kg',
      dimensions: '30x30x10cm'
    }
  },
  {
    name: 'The Shadow Net Hub',
    status: 'Available',
    reliability: 0.88,
    missionCount: 0,
    category: 'Communication',
    powerLevel: 85,
    description: 'Portable satellite uplink with global coverage',
    technicalSpecs: {
      powerSource: 'Solar Battery',
      activeTime: '24 hours',
      weight: '3kg',
      dimensions: '50x50x20cm'
    }
  },
  {
    name: 'The Mirage Maker Pro',
    status: 'Available',
    reliability: 0.92,
    missionCount: 0,
    category: 'Holography',
    powerLevel: 95,
    description: 'Holographic environmental manipulator',
    technicalSpecs: {
      powerSource: 'Holo Battery',
      activeTime: '10 hours',
      weight: '4kg',
      dimensions: '60x60x30cm'
    }
  },
  {
    name: 'The Silent Echo',
    status: 'Decommissioned',
    reliability: 0.75,
    missionCount: 12,
    decommissionedAt: new Date(),
    decommissionReason: 'Exceeded operational lifespan',
    category: 'Sound',
    powerLevel: 70,
    description: 'Sound dampening field generator',
    technicalSpecs: {
      powerSource: 'Echo Battery',
      activeTime: '5 hours',
      weight: '2kg',
      dimensions: '20x20x10cm'
    }
  },
  {
    name: 'The Nighthawk Scanner',
    status: 'Available',
    reliability: 0.89,
    missionCount: 2,
    category: 'Surveillance',
    powerLevel: 88,
    description: 'Multi-spectrum surveillance system with AI analysis',
    technicalSpecs: {
      powerSource: 'Hawk Battery',
      activeTime: '15 hours',
      weight: '1kg',
      dimensions: '25x25x15cm'
    }
  },
  {
    name: 'The Phantom Key',
    status: 'Available',
    reliability: 0.94,
    missionCount: 0,
    category: 'Access',
    powerLevel: 92,
    description: 'Universal access device with biometric spoofing',
    technicalSpecs: {
      powerSource: 'Phantom Battery',
      activeTime: '20 hours',
      weight: '0.5kg',
      dimensions: '10x10x5cm'
    }
  }
];

async function seedGadgets() {
  try {
    await sequelize.authenticate();
    
    // Create gadgets
    for (const gadget of sampleGadgets) {
      await Gadget.create(gadget);
      console.log('Created gadget:', gadget.name);
    }
    
    console.log('Sample gadgets created successfully');
  } catch (err) {
    console.error('Failed to seed gadgets:', err);
  } finally {
    await sequelize.close();
  }
}

seedGadgets();
