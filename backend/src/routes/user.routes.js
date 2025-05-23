import express from "express";
import verifyUser from "../middlerwares/auth.middleware.js";
import {
  userSingup,
  userLogin,
  getCurrentUser,
  userLogout,
  becomeSeller,
  addAddress,
  grantNewTokens,
} from "../controllers/user.controller.js";

const userAuthRoutes = express.Router();

userAuthRoutes.route("/signup").post(userSingup);
userAuthRoutes.route("/login").post(userLogin);
userAuthRoutes.route("/getuser").get(verifyUser, getCurrentUser);
userAuthRoutes.route("/logout").post(verifyUser, userLogout);
userAuthRoutes.route("/new-tokens").post(grantNewTokens);
userAuthRoutes.route("/become-seller").patch(verifyUser, becomeSeller);
userAuthRoutes.route("/add-address").patch(verifyUser, addAddress);

export default userAuthRoutes;
