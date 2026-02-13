import "dotenv/config";

import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// auth guard middleware
const authGuard = async (req: Request, res: Response, next: NextFunction) => {
  // get the token
  const sessionToken = req.headers["authorization"];

  if (!sessionToken) {
    return next();
  }

  // validation
  if (!sessionToken.startsWith("Bearer")) {
    return res.status(400).json({
      message: "Session token must begin with 'Bearer'",
    });
  }

  const mainToken = sessionToken.split(" ")[1];

  if (!mainToken) {
    return res.status(400).json({
      message: "Invalid token format",
    });
  }

  // verify the token
  jwt.verify(mainToken, process.env.JWT_SECRET_KEY!, (err, decoded) => {
    if (err) {
      return res.status(400).json({
        message: `Token verification failed. ${err}`,
      });
    }

    // append the user to the req.
    req.user = decoded;
    return next();
  });
};

// ensure user is authenticated middleware
const ensureUserAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({
      message: "User is not authenticated",
    });
  }

  next();
};

export { authGuard, ensureUserAuthenticated };
