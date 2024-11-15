import express from "express";
import completionRouter from "./routes/completion.mjs";
import mypageRouter from "./routes/mypage.mjs";
import "./helpers/db.mjs";
const app = express();
// Vercelの場合下記は不要
const port = process.env.PORT || 3000;
app.use(express.json());
app.use("/api/completion", completionRouter);
app.use("/api/mypage", mypageRouter);
app.get("/test", (req, res) => {
    res.send("Health Checker API");
});
app.use((req, res, next) => {
    res.status(404).send("Not Found");
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});
// Vercelの場合下記は不要
app.listen(Number(port), () => {
    console.log(`Server is running at http://localhost:${port}`);
});
