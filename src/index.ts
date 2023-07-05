import puppeteer from "puppeteer";
import express, { Request, Response } from "express";
import { login } from "./functions/login";
import { add } from "./functions/server";
import * as bodyParser from "body-parser";

const startPuppeteer = async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto("https://app.runwayml.com/");
  await page.setViewport({ width: 1080, height: 1024 });

  return page;
};

const startExpress = () => {
  const app = express();
  const port = 3005;
  app.use(bodyParser.json());
  app.get("/", (_: Request, res: Response) => {
    res.send("RunwayML API");
  });
  app.listen(port, () => {
    console.log(`[RunwayML API]: Started at http://localhost:${port}`);
  });

  return app;
};

const main = async () => {
  const page = await startPuppeteer();
  await login(page);

  const app = startExpress();
  add.imageServer(app, page);
};

main();
