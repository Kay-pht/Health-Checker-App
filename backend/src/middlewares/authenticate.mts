import { Request, Response, NextFunction } from "express";
import admin from "firebase-admin";
import * as dotenv from "dotenv";
import * as path from "path";
import { promises as fs } from "fs";
import { CustomAuthRequest } from "../interfaces/interfaces";

dotenv.config();
// キーがあるファイルパスを渡す
const serviceAccountKey = process.env.SERVICE_ACCOUNT_KEY;
if (!serviceAccountKey) {
  throw new Error(
    "Service account key is not defined in the environment variables."
  );
}
//初期化
const initializeFirebaseAdmin = async () => {
  try {
    const serviceAccount = JSON.parse(
      // デプロイ用
      Buffer.from(serviceAccountKey, "base64").toString("utf-8")
      // 開発環境用
      // await fs.readFile(serviceAccountPath, "utf-8")
    );
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    });
    console.log("Firebase Admin initialized successfully.");
  } catch (error) {
    console.error("Failed to read service account key file:", error);
    throw new Error("Failed to initialize Firebase Admin.");
  }
};

initializeFirebaseAdmin();

// クライアントから送られてきたトークンの検証
export const authenticate = async (
  req: CustomAuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ error: "No token provided" });
    return;
  }
  const idToken = authHeader.split(":")[1];
  try {
    // Firebase Admin SDKの認証サービスにアクセスして、verifyIdToken() メソッドでIDトークンを検証。
    //トークンが有効なら、トークンに含まれる情報（デコードされたトークン）を返す
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    // リクエストにユーザーIDを追加して、後続のルートで使用できるようにする
    req.userId = decodedToken.uid;
    next();
  } catch (error) {
    console.error("Error verifying ID token:", error);
    throw new Error("Invalid token");
  }
};
