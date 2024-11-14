import express, { NextFunction, Request, Response } from "express";
import completionRouter from "./routes/completion.mjs";
import mypageRouter from "./routes/mypage.mjs";
import "./helpers/db.mjs";

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.use("/api/completion", completionRouter);
app.use("/api/mypage", mypageRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(Number(port), "0.0.0.0", () => {
  console.log(`Server is running at http://localhost:${port}`);
});
