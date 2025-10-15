import type { Request, Response, NextFunction } from "express";
import { PathLike } from "node:fs";
import { writeFile, readFile } from "node:fs/promises";
import * as path from "node:path";
const randomstring = require("randomstring");

const LOG_DIR = path.join(__dirname, "..", "logs");
console.log(LOG_DIR);

export async function createFile(message: String, url: String): Promise<void> {
  try {
    console.log("url: ", url); //------------------------------------------------------------------------------------------
    console.log("message: ", message);
    //await writeFile("test.txt", message, { encoding: "utf-8" });

    await writeFile(LOG_DIR + `/${url}.txt`, message, { encoding: "utf-8" });
  } catch (error) {
    console.error(error);
  }
}

export async function readMessage(filePath: PathLike): Promise<void> {
  try {
    console.log("filePath: ", filePath); //------------------------------------------------------------------------------------------

    const contents = await readFile(filePath);
  } catch (error) {
    console.error(error);
  }
}
export async function logger(req: Request, res: Response, next: NextFunction) {
  if (req.body) {
    console.log("logged message: ", req.body.textInput); //------------------------------------------------------------------------------------------

    const message = req.body.textInput;
    const url = req.originalUrl;

    const generatedStringUrl = randomstring.generate(15);
    await createFile(message, generatedStringUrl);
    //(req as any).logMessage = generatedStringUrl; //logMessage can be any Word, doesnt have to be logMessage as long as its the same in index.ts
    req.body.generatedString = generatedStringUrl;
  }

  next();
}

/* thinking notes

    i put a message in the input field. 
    i push the button
    i get a link && message is saved in a file
    i send link idk. 
    link is opend
    message is shown && file is deleted
    


*/
