import express from "express";
import ResponseHandler from "../config/responseHandler";
import BookController from "../controllers/book";
import CabController from "../controllers/cab";
import PingController from "../controllers/ping";
import UserController from "../controllers/user";
const auth = require("../middlewares/auth");
const router = express.Router();

router.get("/health", async (req, res) => {
    const controller = new PingController();
    const response = await controller.getMessage();
    let message = ResponseHandler.format(response);
    res.status(message.status).json(message.body);
});

router.post("/book/order", auth.verify, async (req, res) => {
    const controller = new BookController();
    req.body.bookedBy = req['user'].email;
    const response = await controller.bookCab(req.body);
    let message = ResponseHandler.format(response);
    res.status(message.status).json(message.body);
});

router.get("/book/history", auth.verify, async (req, res) => {
    const controller = new BookController();
    const response = await controller.getBookings(req.query);
    let message = ResponseHandler.format(response);
    res.status(message.status).json(message.body);
});

router.get("/cab/nearby", auth.verify, async (req, res) => {
    const controller = new CabController();
    const response = await controller.getNearbyCabs(req.query);
    let message = ResponseHandler.format(response);
    res.status(message.status).json(message.body);
});

router.post('/auth/login', async (req, res) => {
    const controller = new UserController();
    const response = await controller.login(req.body);
    let message = ResponseHandler.format(response);
    res.status(message.status).json(message.body);
});

router.post('/auth/signup', async (req, res) => {
    const controller = new UserController();
    const response = await controller.signup(req.body);
    let message = ResponseHandler.format(response);
    res.status(message.status).json(message.body);
});
export default router;