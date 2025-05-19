import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

async function connectDB() {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    console.log("Database Connected");
  } catch (error) {
    console.log("MonogoDB Connection Error: ", error);
  }
}

export default connectDB;
