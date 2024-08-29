import express from "express";
import path from 'path';

const app = express();
const PORT = 3000;

app.use(express.static(path.resolve()));

app.get("/", (req, res) => {
  res.sendFile("index.htm", { root: path.resolve() });
});

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}/`);
});