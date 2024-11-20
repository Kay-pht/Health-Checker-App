import express, { NextFunction, Request, Response } from "express";
import completionRouter from "./routes/completion.mjs";
import mypageRouter from "./routes/mypage.mjs";
import "./helpers/db.mjs";
import cors from "cors";
import path from "path";

const app = express();
// Vercelの場合下記は不要。
const port = process.env.PORT || 3000;

// // CORSを許可する
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     credentials: true,
//   })
// );

// 本番環境での静的ファイルの提供
app.use(express.static("/app/dist/frontend"));

app.use(express.json());

app.use("/api/completion", completionRouter);
app.use("/api/mypage", mypageRouter);

app.get("/test", (req: Request, res: Response) => {
  res.send("Health Checker API");
});

// 上記以外のルートはindex.htmlを返す（SPAの場合）
app.get("*", (req: Request, res: Response) => {
  res.sendFile("/app/dist/frontend/index.html");
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send("Sorry...Not Found");
});
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Vercelの場合下記は不要
app.listen(Number(port), () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// Vercel用にエクスポート
// export default app;
