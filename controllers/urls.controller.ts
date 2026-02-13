import "dotenv/config";
import type { Request, Response } from "express";
import { db } from "../db/index.ts";
import { urls } from "../models/index.ts";
import { and, eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import z from "zod";
import jwt from "jsonwebtoken";
import { shortenSchema } from "../validations/url.validation.ts";

// shorten
const shorten = async (req: Request, res: Response) => {
  // validation on the inputs
  const validationResult = await shortenSchema.safeParseAsync(req.body);

  if (!validationResult.success) {
    return res.status(400).json({
      message: z.treeifyError(validationResult.error),
    });
  }

  const { targetURL } = validationResult.data;

  // create a new entry to the db
  const [newURL] = await db
    .insert(urls)
    .values({
      shortCode: nanoid(6),
      targetURL,
      userId: req.user.id,
    })
    .returning();

  if (!newURL) {
    return res.status(400).json({
      message: "Something went wrong while shortening the URL",
    });
  }

  res.status(201).json({
    message: "The mentioned URL was successfully shortened",
    data: newURL,
  });
};

// redirect to targetURL
const redirectToTargetURL = async (req: Request, res: Response) => {
  // extract the shortcode
  const { shortCode } = req.params;

  // find the url
  const [existingURL] = await db
    .select({ targetURL: urls.targetURL })
    .from(urls)
    .where(eq(urls.shortCode, shortCode as string))
    .limit(1);

  if (!existingURL) {
    return res.status(404).json({
      message: "URL with such shortcode doesn't exist",
    });
  }

  res.redirect(existingURL.targetURL);
};

// get all the shortcodes made by the user
const getAll = async (req: Request, res: Response) => {
  //get all the entries from the db
  const shortcodes = await db
    .select()
    .from(urls)
    .where(eq(urls.userId, req.user.id));

  res.status(200).json({
    message: "All the shortcodes made by the user was successfully fetched",
    data: shortcodes,
  });
};

// remove
const remove = async (req: Request, res: Response) => {
  // extract the shortcode
  const { shortCode } = req.params;

  // remove the url
  const [removedUrl] = await db
    .delete(urls)
    .where(
      and(
        eq(urls.shortCode, shortCode as string),
        eq(urls.userId, req.user.id),
      ),
    )
    .returning({ id: urls.id });

  if (!removedUrl) {
    return res.status(403).json({
      message: "You're not authorized to delete this shortcode",
    });
  }

  res.status(200).json({
    message: "The mentioned URL was successfully deleted",
  });
};

export { shorten, redirectToTargetURL, getAll, remove };
