import jwt from "jsonwebtoken"

export function validateToken(req, res, next) {
  try {
    const token = req.headers.token
    if (token == null) return res.json({ message: "Token not provided" })

    const verifyResponse = jwt.verify(token, process.env.JWT_SECRET_KEY)
    res.username = verifyResponse.username
    next()
  } catch (error) {
    res.status(401).json({ message: "Token Error" })
  }
}
