import express from "express";
import { getPetByID, getPets } from "../controllers/pet.controller.js";
import { validateNumericId } from "../middleware/pet.middleware.js";

const router = express.Router();

router.get("/", getPets);
router.get("/:id", validateNumericId, getPetByID);

export default router;
