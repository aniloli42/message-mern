import express from "express"
import AuthController from "../controllers/auth.controller.js"
import validateToken from "../middleware/validateToken.js"
const router = express.Router()
const user = new AuthController()

router.post("/login", user.loginUser.bind(user))
router.post("/signup", user.signupUser.bind(user))
router.post("/token", user.tokenUpdater.bind(user))
router.post("/logout", validateToken, user.logout.bind(user))

export default router
