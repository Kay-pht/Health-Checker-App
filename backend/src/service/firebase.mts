import configEnv from "../configEnv.mjs";
import admin from "firebase-admin";

const { serviceAccountKey } = configEnv;
if (!serviceAccountKey) {
  throw new Error(
    "Service account key is not defined in the environment variables."
  );
}

//firebase SDKの初期化
const initializeFirebaseAdmin = async () => {
  try {
    // エンコードされたキーをbase64形式でデコード。その後、JSON形式でキーを読み出す
    const serviceAccount = JSON.parse(
      Buffer.from(serviceAccountKey, "base64").toString("utf-8")
    );
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    });
    console.log("Firebase Admin initialized successfully.");
  } catch (error) {
    console.error("Failed to read service account key file:", error);
    process.exit(1);
  }
};

export default initializeFirebaseAdmin;
