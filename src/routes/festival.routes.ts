import { Router } from "express";
import { FestivalController } from "../controller/festival.controller";
import { FestivalService } from "../services/festival.service";

const router = Router();
const festivalService = new FestivalService();
const festivalController = new FestivalController(festivalService);

// URIs shouldn't indicate functionality (security aspect - prevents that the URIs give opportunities for bad intentions)
// Swagger documentation is placed here so the controller class is not bloated with huge Swagger comments
/**
 * @swagger
 * /api/v1/festivals:
 *   get:
 *     summary: Retrieve a paginated list of festivals
 *     tags: [Festivals]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number to retrieve
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 5
 *         description: Number of festivals per page
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter by festival name
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         description: Filter by festival location
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter festivals starting from this date (YYYY-MM-DD)
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter festivals ending before or on this date (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: A list of festivals
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Festival'
 *       500:
 *         description: Internal server error
 */
router.get("/", festivalController.loadFestivals);
/**
 * @swagger
 * /api/v1/festivals/{festivalId}:
 *   get:
 *     summary: Load a festival by its ID
 *     tags: [Festivals]
 *     description: Fetch a specific festival's details by its ID.
 *     parameters:
 *       - in: path
 *         name: festivalId
 *         required: true
 *         description: ID of the festival to be fetched
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Festival details loaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Festival'
 *       400:
 *         description: Invalid festival ID
 *       404:
 *         description: Festival not found
 *       500:
 *         description: Internal server error
 */
router.get("/:festivalId", festivalController.loadFestival);
/**
 * @swagger
 * /api/v1/festivals:
 *   post:
 *     summary: Create a new festival
 *     tags: [Festivals]
 *     description: Creates a new festival by providing the necessary festival details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - date
 *               - location
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the festival
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: The date of the festival (ISO-8601 format)
 *               location:
 *                 type: string
 *                 description: The location of the festival
 *               description:
 *                 type: string
 *                 description: A brief description of the festival
 *                 nullable: true
 *               imageUrl:
 *                 type: string
 *                 description: A URL for the festival's image
 *                 nullable: true
 *     responses:
 *       201:
 *         description: Festival created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Festival'
 *       400:
 *         description: Invalid input (missing or incorrect fields)
 *       500:
 *         description: Internal server error
 */
router.post("/", festivalController.createFestival);
/**
 * @swagger
 * /api/v1/festivals/{festivalId}:
 *   delete:
 *     summary: Delete a festival by ID
 *     tags: [Festivals]
 *     description: Deletes a specific festival by providing its festival ID.
 *     parameters:
 *       - in: path
 *         name: festivalId
 *         required: true
 *         description: The ID of the festival to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Festival deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Festival with ID 1 deleted"
 *       400:
 *         description: Invalid festival ID provided
 *       404:
 *         description: Festival not found with the provided ID
 *       500:
 *         description: Internal server error
 */
router.delete("/:festivalId", festivalController.deleteFestival);
/**
 * @swagger
 * /api/v1/festivals/{festivalId}:
 *   put:
 *     summary: Update an existing festival by ID
 *     tags: [Festivals]
 *     description: Updates the details of a festival based on the provided festival ID.
 *     parameters:
 *       - in: path
 *         name: festivalId
 *         required: true
 *         description: The ID of the festival to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FestivalUpdateDTO'
 *     responses:
 *       200:
 *         description: Festival updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Festival'
 *       400:
 *         description: Invalid festival ID or input data
 *       404:
 *         description: Festival not found with the provided ID
 *       500:
 *         description: Internal server error
 */
router.put("/:festivalId", festivalController.updateFestival);

export default router;
