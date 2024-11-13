import express from "express";
import completionRouter from "./routes/completion.mjs";
import mypageRouter from "./routes/mypage.mjs";
import "./helpers/db.mjs";

const app = express();
const port = 3000;
app.use(express.json());

app.use("/api/completion", completionRouter);
app.use("/api/mypage", mypageRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
