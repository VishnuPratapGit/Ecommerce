import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//ROUTES
import userAuthRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";

app.use("/api/v1/users", userAuthRoutes);
app.use("/api/v1/products", productRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

export default app;
