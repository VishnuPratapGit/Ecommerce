import express from "express";
import verifyUser from "../middlerwares/auth.middleware.js";
import {
  userSingup,
  userLogin,
  getCurrentUser,
  userLogout,
} from "../controllers/user.controller.js";

const userAuthRoutes = express.Router();

userAuthRoutes.route("/signup").post(userSingup);
userAuthRoutes.route("/login").post(userLogin);
userAuthRoutes.route("/getuser").get(verifyUser, getCurrentUser);
userAuthRoutes.route("/logout").post(verifyUser, userLogout);

export default userAuthRoutes;
