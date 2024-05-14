import express from "express";

import allRoutes from "./routes/index.js";

const app = express();

app.use(express.json());

app.use(allRoutes);

app.listen(3002, () => {
  console.log("server started");
});
