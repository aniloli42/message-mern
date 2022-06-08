import { Op } from "sequelize"
import Message from "../models/message.model.js"
import User from "../models/auth.model.js"
import Users from "../models/auth.model.js"
import sequelize from "sequelize"

class MessageController {
  async getMessageList(req, res) {
    try {
      // const messageList = await Message.findAll({
      //   where: {
      //     [Op.or]: [
      //       {
      //         userone: res.username,
      //       },
      //       {
      //         usertwo: res.username,
      //       },
      //     ],
      //     include: {
      //       model: Users,
      //       require: true,
      //     },
      //   },
      // })

      await Message.sequelize.query("SELECT * FROM ")

      if (messageList === null) {
        return res.json([])
      }

      res.status(200).json(messageList)
    } catch (error) {
      console.error(error.message)
      res.status(400).json({ message: "Something went Wrong" })
    }
  }

  async createMessage(req, res) {
    try {
      const { username } = req.body
      const own = res.username

      if (username == null) {
        return res.status(404).json("Username not found")
      }

      const findExisting = await Message.findOne({
        where: {
          userone: {
            [Op.or]: [username, own],
          },
          usertwo: {
            [Op.or]: [username, own],
          },
        },
      })

      if (findExisting != null) return res.json({ status: true })
      await Message.create({ userone: own, usertwo: username })

      res.status(200).json({ status: true })
    } catch (error) {
      console.error(error.message)
      res.status(400).json({ message: "Something went Wrong" })
    }
  }
}

export default MessageController
