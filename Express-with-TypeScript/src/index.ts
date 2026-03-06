import express from "express";
import type { Express, Request, Response } from "express";
import cors from "cors";
import { Pet, pets } from "./data/pets.js";
import petRoutes from "./routes/pet.routes.js";

const PORT = 8080;
const app: Express = express();

app.use(cors());
app.use("/pets", petRoutes);

app.use(async (req: Request, res: Response<{ message: string }>) => {
  res.status(404).json({ message: "Route doesn't exist!" });
});

app.listen(PORT, (): void => {
  console.log(`Listening on port ${PORT}`);
});
