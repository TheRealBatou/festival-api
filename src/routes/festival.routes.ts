import { Router } from "express";
import { FestivalController } from "../controller/festival.controller";
import { FestivalService } from "../services/festival.service";

const router = Router();
const festivalService = new FestivalService();
const festivalController = new FestivalController(festivalService);

// URIs shouldn't indicate functionality (security aspect - prevents that the URIs give opportunities for bad intentions)
router.get("/", festivalController.loadFestivals);
router.get("/:festivalId", festivalController.loadFestival);
router.post("/", festivalController.createFestival);
router.delete("/:festivalId", festivalController.deleteFestival);
router.put("/:festivalId", festivalController.updateFestival);

export default router;
