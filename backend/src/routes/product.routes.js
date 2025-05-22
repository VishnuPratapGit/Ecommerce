import express from "express";
import upload from "../middlerwares/multer.middleware.js";
import verifyUser from "../middlerwares/auth.middleware.js";
import {
  getAllProducts,
  getMyProducts,
  uploadProduct,
  getCategoryWiseProducts,
  createBulkCategory,
  getAllCategories,
} from "../controllers/product.controller.js";
const productRoutes = express.Router();

productRoutes
  .route("/upload")
  .post(verifyUser, upload.array("images", 5), uploadProduct);
productRoutes.route("/get-products").get(verifyUser, getMyProducts);
productRoutes.route("/get-all-products").get(getAllProducts);
productRoutes.route("/grouped-by-category").get(getCategoryWiseProducts);
productRoutes.route("/create-bulk-category").post(createBulkCategory);
productRoutes.route("/get-all-categories").get(getAllCategories);

export default productRoutes;
