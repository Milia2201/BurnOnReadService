import "dotenv/config";
import express from "express";
import type { Response, Request } from "express";
import cors from "cors";
import nunjucks from "nunjucks";
import { createFile, readMessage } from "./CRUD";
import * as path from "node:path";
import generatRandomString from "./generateStringHelper";

const app = express();
const port = process.env.PORT || 3000;

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.render("index.html", {
    title: "Burn on Read",
  });
});

app.get("/Test", (req: Request, res: Response) => {
  res.render("message.html", {});
});

app.post("/message-saved", async (req: Request, res: Response)  => {
  const generatedString = generatRandomString();
  const LOG_DIR = path.join(__dirname, "..", "..", "logs");
  console.log("test: ",req.body.textInput)
  await createFile(req.body.textInput, generatedString);
  res.render("message-saved.html", {
    generatedLink: LOG_DIR + `/${generatedString}.txt`,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
