import express, { NextFunction, Request, Response } from "express";
import completionRouter from "./routes/chatCompletion.mjs";
import mypageRouter from "./routes/myPage.mjs";
import "./helpers/connectDB.mjs";
import configEnv from "./configEnv.mjs";

const app = express();
const { port } = configEnv;

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

app.listen(Number(port), () => {
  console.log(`Server is running at http://localhost:${port}`);
});
