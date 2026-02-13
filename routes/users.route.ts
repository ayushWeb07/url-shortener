import { Router } from "express";
import * as users from "../controllers/users.controller.ts";

const router = Router();

// POST /signup
router.post("/signup", users.signup);

// POST /login
router.post("/login", users.login);

export default router;
