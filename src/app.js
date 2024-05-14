import 'dotenv/config'

import express from "express";
import allRoutes from "./routes/index.js";
import { connectDB } from "./db/config.js";

const app = express();

app.use(express.json());

app.use(allRoutes);

connectDB();

app.listen(3002, () => {
  console.log("server started");
});
