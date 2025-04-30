import express from "express";
import { getMe, login, logout, signup, update } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/me", protectRoute, getMe);
router.put("/update", protectRoute, update); // Added update route
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

export default router;