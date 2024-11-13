import mongoose from "mongoose";
import env from "dotenv";
env.config();

// Mongooseを使ってDB接続する
mongoose.set("strictQuery", true);

const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  throw new Error("MONGO_URI is not defined in the environment variables");
}

mongoose
  .connect(mongoUri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));
