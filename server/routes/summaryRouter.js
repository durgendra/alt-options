import { Router } from "express";

import { getSummaries, createSummary } from "../controllers/summary.js";
import auth from "../middleware/auth.js";

const summaryRouter = Router();

summaryRouter.post("/", auth, createSummary);
summaryRouter.get("/", auth, getSummaries);

export default summaryRouter;
