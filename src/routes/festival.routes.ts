import { Router } from "express";
import { FestivalController } from "../controller/festival.controller";
import { FestivalService } from "../services/festival.service";

const router = Router();
const festivalService = new FestivalService();
const festivalController = new FestivalController(festivalService);

router.get("/", festivalController.loadFestivals);
router.get("/:festivalId", festivalController.loadFestival);
router.post("/", festivalController.createFestival);
router.delete("/:festivalId", festivalController.deleteFestival);

export default router;
