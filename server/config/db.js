import "dotenv/config"
import { Sequelize } from "sequelize"

const dbConnection = new Sequelize({
  dialect: "mysql",
  username: process.env.DB_USER_NAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB,
})

export default dbConnection
