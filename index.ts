import "dotenv/config";
import express from "express";
import type { Request, Response } from "express";
import userRoutes from "./routes/users.route.ts";
import urlRoutes from "./routes/urls.route.ts";
import { authGuard } from "./middlewares/auth.middleware.ts";

// app config
const app = express();
const port = process.env.PORT ?? 8080;

// setup middlewares
app.use(express.json());
app.use(authGuard)

// home route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Server is up and running...",
  });
});

// setup routes
app.use("/users", userRoutes);
app.use("/urls", urlRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
