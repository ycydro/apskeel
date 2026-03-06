import express from "express";
import { getPetByID, getPets } from "../controllers/pet.controller.js";

const router = express.Router();

router.get("/", getPets);
router.get("/:id", getPetByID);

export default router;
