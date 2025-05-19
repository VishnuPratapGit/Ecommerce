import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const verifyUser = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: Token missing" });
    }

    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!payload?._id) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    const user = await User.findById(payload._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(403).json({ message: "Forbidden: Invalid token" });
  }
};

export default verifyUser;
