import mongoose from "mongoose";
import configEnv from "../configEnv.mjs";
mongoose.set("strictQuery", true);

const { mongoUri } = configEnv;

if (!mongoUri) {
  throw new Error("MONGO_URI is not defined in the environment variables");
}

// Mongooseを使ってDB接続する
mongoose
  .connect(mongoUri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1); // Stop the server if connection fails
  });
