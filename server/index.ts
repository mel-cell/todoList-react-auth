import express from "express";

const app = express();
const port = 4444;

app.listen(port, () => {
    console.log(`run on ${port}`);
});