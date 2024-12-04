import express, { NextFunction, Request, Response } from "express";
import "./helpers/connectDB.mjs";
import configEnv from "./configEnv.mjs";
import { firebaseAuthMiddleware } from "./middlewares/firebaseAuthMiddleware.mjs";
import postChatCompletion from "./handlers/postChatCompletion.mjs";
import getMyPage from "./handlers/getMyPage.mjs";
import env from "dotenv";

// .envファイルの内容をprocess.envにロード
env.config();

const app = express();
const { port } = configEnv;

app.use(express.static("/app/dist/frontend"));

app.use(express.json());

// ルーティング
app.post("/api/completion", firebaseAuthMiddleware, postChatCompletion);
app.get("/api/mypage", firebaseAuthMiddleware, getMyPage);

// 上記以外のルートはindex.htmlを返す
app.get("*", (req: Request, res: Response) => {
  res.sendFile("/app/dist/frontend/index.html");
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(Number(port), () => {
  console.log(`Server is running at http://localhost:${port}`);
});
