import mongoose from "mongoose";
import dotenv from "dotenv";

export const connectDB = async () => {
  try {
    dotenv.config();
    const db = await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");
    return db;
  } catch (error) {
    console.error("❌ DB Connection Failed:", error.message);
  }
};
