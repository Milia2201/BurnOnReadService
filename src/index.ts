import "dotenv/config";
import express from "express";
import type { Response, Request } from "express";
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors())

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!!!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

