import type { Express, Request, Response } from "express";
import { z } from "zod";
import { genImage } from "./gen";
import { Page } from "puppeteer";

export const add = {
  imageServer: (app: Express, page: Page) => {
    app.post("/image", async (req: Request, res: Response) => {
      const input = z
        .object({
          prompt: z.string(),
        })
        .safeParse(req.body);

      if (!input.success) {
        res.status(400).json({ message: "Bad request" });
        console.log(req.body);
        return;
      } else {
        console.log(
          `[RunwayML API]: Received request to generate image with prompt: ${input.data.prompt}`
        );
      }

      const { prompt } = input.data;

      let imageUrl: string;

      try {
        imageUrl = await genImage(page, prompt);
      } catch (error) {
        res.status(500).json({ message: "Generation failed" });
        return;
      }

      res.status(200).json({ prompt: imageUrl });
    });
  },
};
