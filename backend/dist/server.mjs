import express from "express";
import completionRouter from "./routes/completion.mjs";
const app = express();
const port = 3000;
app.use(express.json());
app.use("/api/completion", completionRouter);
app.get("/api", (req, res) => {
    res.send("Hello world");
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
