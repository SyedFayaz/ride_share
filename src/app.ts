require('dotenv').config()
import express, { Application } from "express";
import { Database } from "./config/database";
import { Middleware } from "./middlewares/middleware";

const app: Application = express();
const PORT = process.env.PORT || 3000;
const host = process.env.HOST

Middleware.initialise(app);
Database.connect();

app.listen(PORT, () => {
    console.log(`Ride sharing app running at: http://${host}:${PORT}/docs`);
});