import express, { Application } from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import Router from "../routes";
const apiLimiter = require("./limiter");

export class Middleware {
    static initialise(app: Application) {
        app.use(apiLimiter.rateLimit);
        app.use(express.json());
        app.use(morgan("tiny"));
        app.use(express.static("public"));
        app.use("/docs", swaggerUi.serve, swaggerUi.setup(undefined, {
            swaggerOptions: {
                url: "/openapi.json",
            },
        }));
        app.use(Router);
        app.use(function notFoundHandler(_req, res) {
            res.status(404).send({
                message: "Not Found",
            });
        });
    }
}