import bcrypt from "bcrypt"
import { generateTokens } from "../helpers/tokenHandler.js"
import Auth from "../models/auth.model.js"

class AuthController {
  async loginUser(req, res) {
    try {
      const { username, password } = req.body

      if (username == null || password == null) {
        return res
          .status(403)
          .json({ message: "All Input Fields values not provided!!!" })
      }

      const hasUser = await Auth.findByPk(username)
      if (hasUser == null) {
        return res.status(403).json({ message: "User Not Exists" })
      }

      const isVerifiedPassword = await this.#verifyPassword(
        password,
        hasUser.password
      )

      if (isVerifiedPassword !== true) {
        return res.status(401).json({ message: "Invalid Credentials" })
      }

      const tokens = generateTokens(username)

      res.json(tokens)
    } catch (error) {
      console.error(error.message)
      return res.status(400).json({ message: "Something Went Wrong!" })
    }
  }

  async signupUser(req, res) {
    try {
      const { username, name, password } = req.body

      if (username == null || password == null || name == null) {
        return res
          .status(403)
          .json({ message: "All Input Fields values not provided!!!" })
      }

      const hasUser = await Auth.findByPk(username)
      if (hasUser != null) {
        return res.status(403).json({ message: "User Already Exists" })
      }

      const hashedPassword = await this.#hashPassword(password)

      await Auth.create({
        username,
        name,
        password: hashedPassword,
      })

      const tokens = generateTokens(username)

      res.json(tokens)
    } catch (error) {
      console.error(error.message)
      return res.status(400).json({ message: "Something Went Wrong!" })
    }
  }

  async #hashPassword(password) {
    return await bcrypt.hash(password, 12)
  }

  async #verifyPassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword)
  }
}

export default AuthController
