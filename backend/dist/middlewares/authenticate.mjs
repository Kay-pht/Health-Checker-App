var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import admin from "firebase-admin";
import * as dotenv from "dotenv";
import { promises as fs } from "fs";
dotenv.config();
// キーがあるファイルパスを渡す
const serviceAccountPath = process.env.SERVICE_ACCOUNT_KEY_PATH;
if (!serviceAccountPath) {
    throw new Error("Service account key path is not defined in the environment variables.");
}
//初期化
const initializeFirebaseAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    const serviceAccount = JSON.parse(
    // 非同期でファイルの読み込み
    // Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT!, "base64").toString(
    //   "utf-8"
    // )
    yield fs.readFile(serviceAccountPath, "utf-8"));
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
});
initializeFirebaseAdmin().catch((error) => {
    console.error("Failed to initialize Firebase Admin:", error);
});
// クライアントから送られてきたトークンの検証
export const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).json({ error: "No token provided" });
        return;
    }
    const idToken = authHeader.split(":")[1];
    try {
        // Firebase Admin SDKの認証サービスにアクセスして、verifyIdToken() メソッドでIDトークンを検証。
        //トークンが有効なら、トークンに含まれる情報（デコードされたトークン）を返す
        const decodedToken = yield admin.auth().verifyIdToken(idToken);
        // リクエストにユーザーIDを追加して、後続のルートで使用できるようにする
        req.userId = decodedToken.uid;
        next();
    }
    catch (error) {
        console.error("Error verifying ID token:", error);
        throw new Error("Invalid token");
    }
});
