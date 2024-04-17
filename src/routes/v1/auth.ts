import { Router } from "express";
import * as auth from "../../controllers/auth";

const router = Router()

router.post("/register", auth.register)
router.post("/admin/register", auth.registerAdmin)
router.post("/login", auth.login)
router.post("/token", auth.getAccessToken)
router.put("/token", auth.refreshToken)

export default router;