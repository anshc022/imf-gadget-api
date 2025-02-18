const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'IMF Gadget API',
      version: '1.0.0',
      description: 'Mission: Impossible Force - Gadget Management System API',
      contact: {
        name: 'IMF Tech Division'
      }
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        Login: {
          type: 'object',
          required: ['username', 'password'],
          properties: {
            username: {
              type: 'string',
              example: 'agent_hunt'
            },
            password: {
              type: 'string',
              format: 'password',
              example: 'mission123'
            }
          }
        },
        Gadget: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'Unique identifier'
            },
            name: {
              type: 'string',
              description: 'Gadget codename'
            },
            status: {
              type: 'string',
              enum: ['Available', 'Deployed', 'Destroyed', 'Decommissioned'],
              description: 'Current operational status'
            },
            reliability: {
              type: 'number',
              format: 'float',
              minimum: 0,
              maximum: 1,
              description: 'Reliability rating (0.0 to 1.0)'
            },
            missionCount: {
              type: 'integer',
              minimum: 0,
              description: 'Number of completed missions'
            },
            missionSuccessProbability: {
              type: 'string',
              description: 'Calculated success probability',
              example: '85%'
            },
            lastMissionDate: {
              type: 'string',
              format: 'date-time',
              nullable: true
            },
            decommissionedAt: {
              type: 'string',
              format: 'date-time',
              nullable: true
            },
            decommissionReason: {
              type: 'string',
              nullable: true
            },
            createdAt: {
              type: 'string',
              format: 'date-time'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time'
            },
            powerLevel: {
              type: 'integer',
              minimum: 0,
              maximum: 100,
              description: 'Current power level percentage',
              example: 85
            },
            category: {
              type: 'string',
              enum: ['Surveillance', 'Infiltration', 'Combat', 'Transport', 'Communication'],
              description: 'Gadget category/type'
            },
            description: {
              type: 'string',
              description: 'Detailed gadget description'
            },
            lastMaintenanceDate: {
              type: 'string',
              format: 'date-time',
              description: 'Last maintenance timestamp'
            },
            nextMaintenanceDue: {
              type: 'string',
              format: 'date-time',
              description: 'Next scheduled maintenance date'
            },
            technicalSpecs: {
              type: 'object',
              description: 'Technical specifications',
              properties: {
                powerSource: {
                  type: 'string',
                  example: 'Quantum Battery'
                },
                activeTime: {
                  type: 'string',
                  example: '12 hours'
                },
                weight: {
                  type: 'string',
                  example: '2.5kg'
                },
                dimensions: {
                  type: 'string',
                  example: '40x60x10cm'
                }
              }
            }
          },
          example: {
            id: "123e4567-e89b-12d3-a456-426614174000",
            name: "The Phantom Key",
            status: "Available",
            category: "Infiltration",
            powerLevel: 92,
            reliability: 0.94,
            description: "Universal access device with biometric spoofing",
            technicalSpecs: {
              powerSource: "Phantom Battery",
              activeTime: "20 hours",
              weight: "0.5kg",
              dimensions: "10x10x5cm"
            }
          }
        }
      },
      responses: {
        UnauthorizedError: {
          description: 'Authentication information is missing or invalid',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: {
                    type: 'string',
                    example: 'Authentication required'
                  }
                }
              }
            }
          }
        },
        NotFoundError: {
          description: 'The specified resource was not found',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: {
                    type: 'string',
                    example: 'Gadget not found'
                  }
                }
              }
            }
          }
        }
      }
    },
    security: [{
      bearerAuth: []
    }],
    tags: [
      {
        name: 'Auth',
        description: 'Authentication endpoints'
      },
      {
        name: 'Gadgets',
        description: 'Gadget management operations'
      },
      {
        name: 'Admin',
        description: 'Administrative operations'
      }
    ]
  },
  apis: ['./routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
module.exports = swaggerDocs;
