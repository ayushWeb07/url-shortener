import "dotenv/config";
import type { Request, Response } from "express";
import { db } from "../db/index.ts";
import { users } from "../models/index.ts";
import { eq } from "drizzle-orm";
import CryptoJS from "crypto-js";
import { loginSchema, signupSchema } from "../validations/user.validation.ts";
import z from "zod";
import jwt from "jsonwebtoken";

// sign up
const signup = async (req: Request, res: Response) => {
  // validation on the inputs
  const validationResult = await signupSchema.safeParseAsync(req.body);

  if (!validationResult.success) {
    return res.status(400).json({
      message: z.treeifyError(validationResult.error),
    });
  }

  const { name, email, password } = validationResult.data;

  // get the user
  const [existingUser] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingUser) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  // encrypt the password
  const encryptedPassword = CryptoJS.AES.encrypt(
    password,
    process.env.CRYPTO_SECRET_KEY!,
  ).toString();

  // create the new user
  const [newUser] = await db
    .insert(users)
    .values({
      name,
      email,
      password: encryptedPassword,
    })
    .returning({
      id: users.id,
    });

  if (!newUser) {
    return res.status(500).json({
      message: "Failed to signup the user",
    });
  }

  res.status(201).json({
    userId: newUser.id,
    message: "Signup successfull",
  });
};

// login
const login = async (req: Request, res: Response) => {
  // validation on the inputs
  const validationResult = await loginSchema.safeParseAsync(req.body);

  if (!validationResult.success) {
    return res.status(400).json({
      message: z.treeifyError(validationResult.error),
    });
  }

  const { email, password } = validationResult.data;

  // get the user
  const [existingUser] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (!existingUser) {
    return res.status(404).json({
      message: "User doesn't exist",
    });
  }

  // invalidate the password
  const decryptedBytes = CryptoJS.AES.decrypt(
    existingUser.password,
    process.env.CRYPTO_SECRET_KEY!,
  );
  const orgPassword = decryptedBytes.toString(CryptoJS.enc.Utf8);

  if (orgPassword !== password) {
    return res.status(400).json({
      message: "Incorrect password",
    });
  }

  // create a new session
  const payload = {
    id: existingUser.id,
    email: existingUser.email,
    name: existingUser.name,
  };

  const sessionToken = jwt.sign(payload, process.env.JWT_SECRET_KEY!, {
    expiresIn: "30m",
  });

  res.status(200).json({
    sessionToken,
    message: "Login successfull",
  });
};

export { signup, login };
