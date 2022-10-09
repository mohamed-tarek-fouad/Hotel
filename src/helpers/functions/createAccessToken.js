import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export default function createAccessToken(adminId, tokenId) {
  return jwt.sign({ adminId, tokenId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
}
