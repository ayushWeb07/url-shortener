import { Router } from "express";
import * as urls from "../controllers/urls.controller.ts";
import { ensureUserAuthenticated } from "../middlewares/auth.middleware.ts";

const router = Router();

// POST /shorten
router.post("/shorten", ensureUserAuthenticated, urls.shorten);

// GET /
router.get("/", ensureUserAuthenticated, urls.getAll)

// GET /:shortCode
router.get("/:shortCode", urls.redirectToTargetURL);

// DEL /:shortCode
router.delete("/:shortCode", ensureUserAuthenticated, urls.remove)

export default router;
