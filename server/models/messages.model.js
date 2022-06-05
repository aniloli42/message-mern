import { DataTypes } from "sequelize"
import dbConnection from "../config/db"

const Messages = dbConnection.define("messages", {
  user1: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user2: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.ARRAY,
    allowNull: false,
  },
})

export default Messages
