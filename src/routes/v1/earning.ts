import { Router } from "express";
import useAuth from "../../middlewares/auth";
import { adminOnly } from "../../middlewares/authorize";
import { createEarning, getEarnings } from "../../controllers/earning";

const router = Router()

router.post("/", useAuth, adminOnly, createEarning)
router.get("/", useAuth, adminOnly, getEarnings)

export default router