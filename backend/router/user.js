import express from "express";
import { getUser, login, logout, myProfileUpdate, signup } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router()


router.post("/signup", signup )
router.post("/login", login)
router.get("/logout", logout)
router.get("/me", isAuthenticated, getUser)
router.put("/profile/update", isAuthenticated, myProfileUpdate)





export default router



