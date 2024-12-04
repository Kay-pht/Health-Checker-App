import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const configEnv = {
  openaiApiKey: process.env.OPENAI_API_KEY,
  databaseUrl: process.env.DATABASE_URL,
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGO_URI,
  serviceAccountKey: process.env.SERVICE_ACCOUNT_KEY,
};

export default configEnv;
