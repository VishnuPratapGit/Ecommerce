import express from "express";
import upload from "../middlerwares/multer.middleware.js";
import verifyUser from "../middlerwares/auth.middleware.js";
import { uploadProduct } from "../controllers/product.controller.js";
const productRoutes = express.Router();

productRoutes
  .route("/upload")
  .post(verifyUser, upload.array("images", 5), uploadProduct);

export default productRoutes;
