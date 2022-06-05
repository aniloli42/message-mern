import jwt from "jsonwebtoken"

export function generateTokens(username, expiry = "10m") {
  const token = jwt.sign({ username }, process.env.JWT_SECRET_KEY, {
    expiresIn: expiry,
  })
  const accessToken = jwt.sign({ username }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1month",
  })
  return {
    token,
    accessToken,
  }
}
