import { Router } from "express";
import { createPaper, deletePaper, updatePaper, getPapers, getPaper } from "../Contorllers/paper.js";

const router = Router();

router.post("/create", createPaper);
router.get("/getPapers", getPapers);
router.get("/getPaper/:id", getPaper);
router.put("/updatePaper/:id", updatePaper);
router.delete("/deletePaper/:id", deletePaper);

export default router;