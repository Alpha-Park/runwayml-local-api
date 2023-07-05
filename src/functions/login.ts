import { type Page } from "puppeteer";
import { env } from "~/env";

export const login = async (runwayLoginPage: Page) => {
  const userNameField = await runwayLoginPage.waitForSelector(
    "input[name='Username or Email']"
  );
  const passwordField = await runwayLoginPage.waitForSelector(
    "input[type='password']"
  );

  if (!userNameField || !passwordField) {
    throw new Error("Could not find username or password field");
  }

  await userNameField.type(env.RUNWAY_USERNAME);
  await passwordField.type(env.RUNWAY_PASSWORD);
  await runwayLoginPage.locator("button[type='submit']").click();
  try {
    await runwayLoginPage.locator("button ::-p-text('Try For Free')").click();
  } catch {
    return;
  }
};
