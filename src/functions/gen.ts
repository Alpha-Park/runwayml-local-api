import { Page } from "puppeteer";

export const genImage = async (page: Page, prompt: string) => {
  const link = await page.waitForSelector(
    "::-p-aria([name='Gen-2: Text to Video'])"
  );
  link && (await link.click());
  await page.waitForNavigation();

  await page.locator("textarea").click();

  await page.keyboard.type(prompt);

  await page.locator("button ::-p-text('Preview')").click();

  await new Promise((resolve) => setTimeout(resolve, 5000));

  const anchorButton = await page.waitForSelector(
    "button ::-p-text('Generate this')"
  );

  if (!anchorButton) {
    throw new Error("Could not find generate button");
  }

  const imageContainer = await anchorButton.waitForSelector(
    "xpath/ancestor::div[1]/ancestor::div[1]"
  );

  if (!imageContainer) {
    throw new Error("Could not find image container");
  }

  const backgroundImage = await imageContainer.evaluate(
    (el) => window.getComputedStyle(el).backgroundImage,
    await page.$(".home-masthead")
  );

  const backgroundImageCleaned = backgroundImage.match(/url\("(.*)"/)![1];

  if (!backgroundImageCleaned) {
    throw new Error("Could not find background image");
  }

  return backgroundImageCleaned;
};
