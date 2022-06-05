import express from "express"
import cors from "cors"

import authRoute from "./routes/auth.route.js"
import messageRoute from "./routes/message.route.js"
import dbConnection from "./config/db.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.get("/", (req, res) => {
  res.json({ message: "Hi" })
})

// routes
app.use("/auth", authRoute)
app.use("/message", messageRoute)

// listening the app
app.listen(8000, async () => {
  try {
    await dbConnection.authenticate()
    dbConnection.sync()
  } catch (error) {
    console.error(error.message)
  }
})
