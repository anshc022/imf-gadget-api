const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');
const { validate, gadgetValidations } = require('../middleware/validate');
const {
  getGadgets,
  addGadget,
  updateGadget,
  deleteGadget,
  selfDestruct,
  performMaintenance
} = require('../controllers/gadgetController');

/**
 * @swagger
 * components:
 *   schemas:
 *     GadgetCreate:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: Base name for the gadget (will be modified to create unique codename)
 * 
 * /gadgets:
 *   get:
 *     tags: [Gadgets]
 *     summary: Retrieve all gadgets
 *     description: Get a list of all gadgets with optional status filtering
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [Available, Deployed, Destroyed, Decommissioned]
 *         description: Filter gadgets by status
 *         example: Available
 *     responses:
 *       200:
 *         description: A list of gadgets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Gadget'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *   post:
 *     tags: [Gadgets]
 *     summary: Create a new gadget
 *     description: Add a new gadget to the inventory (Admin & Technician only)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - category
 *             properties:
 *               name:
 *                 type: string
 *                 description: Base name for the gadget
 *               category:
 *                 type: string
 *                 enum: [Surveillance, Infiltration, Combat, Transport, Communication]
 *               status:
 *                 type: string
 *                 enum: [Available, Deployed]
 *                 default: Available
 *               reliability:
 *                 type: number
 *                 format: float
 *                 minimum: 0
 *                 maximum: 1
 *                 default: 0.8
 *               description:
 *                 type: string
 *               technicalSpecs:
 *                 type: object
 *                 properties:
 *                   powerSource:
 *                     type: string
 *                   activeTime:
 *                     type: string
 *                   weight:
 *                     type: string
 *                   dimensions:
 *                     type: string
 *           example:
 *             name: "The Phantom Key"
 *             category: "Infiltration"
 *             status: "Available"
 *             reliability: 0.94
 *             description: "Universal access device with biometric spoofing"
 *             technicalSpecs:
 *               powerSource: "Phantom Battery"
 *               activeTime: "20 hours"
 *               weight: "0.5kg"
 *               dimensions: "10x10x5cm"
 *     responses:
 *       201:
 *         description: Gadget created successfully
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         description: Insufficient permissions
 * 
 * /gadgets/{id}:
 *   patch:
 *     tags: [Gadgets]
 *     summary: Update a gadget
 *     description: Modify gadget details (Admin & Technician only)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [Available, Deployed, Destroyed, Decommissioned]
 *               name:
 *                 type: string
 *               reliability:
 *                 type: number
 *                 format: float
 *     responses:
 *       200:
 *         description: Gadget updated successfully
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 * 
 *   delete:
 *     tags: [Gadgets]
 *     summary: Decommission a gadget
 *     description: Mark a gadget as decommissioned (Admin only)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reason:
 *                 type: string
 *                 description: Reason for decommissioning
 *                 example: Exceeded operational lifespan
 *     responses:
 *       200:
 *         description: Gadget decommissioned successfully
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 * 
 * /gadgets/{id}/self-destruct:
 *   post:
 *     tags: [Gadgets]
 *     summary: Trigger self-destruct
 *     description: Initiate gadget self-destruct sequence (Admin & Agent only)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Self-destruct sequence initiated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 confirmationCode:
 *                   type: string
 *                   example: "x7k9m2"
 *                 message:
 *                   type: string
 *                   example: "Self-destruct sequence initiated"
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */

/**
 * @swagger
 * /gadgets:
 *   get:
 *     summary: Get all gadgets
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [Available, Deployed, Destroyed, Decommissioned]
 *         description: Filter gadgets by status
 *     responses:
 *       200:
 *         description: List of gadgets
 *   post:
 *     summary: Create a new gadget
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Gadget created
 * 
 * /gadgets/{id}:
 *   patch:
 *     summary: Update a gadget
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Gadget updated
 *   delete:
 *     summary: Decommission a gadget
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Gadget decommissioned
 * 
 * /gadgets/{id}/self-destruct:
 *   post:
 *     summary: Trigger gadget self-destruct
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Self-destruct initiated
 */

/**
 * @swagger
 * /gadgets/{id}/maintenance:
 *   post:
 *     tags: [Gadgets]
 *     summary: Perform maintenance
 *     description: Restore power level and update maintenance schedule
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Maintenance completed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 powerLevel:
 *                   type: integer
 *                   example: 100
 *                 lastMaintenanceDate:
 *                   type: string
 *                   format: date-time
 *                 nextMaintenanceDue:
 *                   type: string
 *                   format: date-time
 *                 reliability:
 *                   type: number
 *                   format: float
 *                   example: 0.95
 */

// Apply authentication to all routes
router.use(authenticate);

// Public routes (still needs authentication)
router.get('/', getGadgets);

// Technician & Admin routes
router.post('/', 
  authorize('admin', 'technician'),
  validate(gadgetValidations.create),
  addGadget
);

router.patch('/:id',
  authorize('admin', 'technician'),
  validate(gadgetValidations.update),
  updateGadget
);

// Admin only routes
router.delete('/:id',
  authorize('admin'),
  deleteGadget
);

// Admin & Agent routes
router.post('/:id/self-destruct',
  authorize('admin', 'agent'),
  selfDestruct
);

// Add new route for maintenance
router.post('/:id/maintenance',
  authorize('admin', 'technician'),
  performMaintenance
);

module.exports = router;
