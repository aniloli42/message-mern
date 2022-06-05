import express from "express"
const router = express.Router()

router.get("/", (req, res) => {
  res.json({ m: "K" })
})

export default router
