import express from "express";
import { userSingup, userLogin } from "../controllers/user.controller.js";

const userAuthRoutes = express.Router();

userAuthRoutes.route("/signup").post(userSingup);
userAuthRoutes.route("/login").post(userLogin);

export default userAuthRoutes;
