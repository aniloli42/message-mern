import express from "express"
import AuthController from "../controllers/auth.controller.js"
const router = express.Router()
const user = new AuthController()

router.post("/login", user.loginUser.bind(user))
router.post("/signup", user.signupUser.bind(user))

export default router
