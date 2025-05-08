import { Router } from "express";
import { FestivalController } from "../controller/festival.controller";
import { FestivalService } from "../services/festival.service";

const router = Router();
const festivalService = new FestivalService();
const festivalController = new FestivalController(festivalService);

router.get("/", festivalController.loadFestivals);

export default router;
