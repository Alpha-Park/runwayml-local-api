import puppeteer from "puppeteer";
import { login } from "./functions/login";
import { genImage } from "./functions/genImage";

const main = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto("https://app.runwayml.com/");
  await page.setViewport({ width: 1080, height: 1024 });

  await login(page);
  await genImage(
    page,
    "You are a designer, imagine the use case for the product, design a high resolution 8k concept image. Text generated: This product is a multi-function corner desk with adjustable height, storage drawers, USB ports, and a choice of desktop materials and colors. Make the style more modern and minimalistic."
  );

  // await browser.close();
};

main();
