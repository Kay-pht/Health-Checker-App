import mongoose from "mongoose";
import configEnv from "../configEnv.js";

// Mongooseを使ってDB接続する
mongoose.set("strictQuery", true);

const { mongoUri } = configEnv;

if (!mongoUri) {
  throw new Error("MONGO_URI is not defined in the environment variables");
}

mongoose
  .connect(mongoUri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));
