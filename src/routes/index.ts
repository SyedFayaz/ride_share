import express from "express";
import BookController from "../controllers/book";
import CabController from "../controllers/cab";
import PingController from "../controllers/ping";
import UserController from "../controllers/user";
const auth = require("../middlewares/auth");
const router = express.Router();

router.get("/health", async (req, res) => {
    const controller = new PingController();
    const response = await controller.getMessage();
    return res.send(response);
});

router.post("/book/order", auth.verify, async (req, res) => {
    const controller = new BookController();
    const response = await controller.bookCab(req.body);
    return res.send(response);
});

router.get("/book/history", auth.verify, async (req, res) => {
    const controller = new BookController();
    const response = await controller.getBookings(req.query);
    return res.send(response);
});

router.get("/cab/nearby", auth.verify, async (req, res) => {
    const controller = new CabController();
    const response = await controller.getNearbyCabs(req.query);
    return res.send(response);
});

router.post('/auth/login', async (req, res) => {
    const controller = new UserController();
    const response = await controller.login(req.body);
    return res.send(response);
});

router.post('/auth/signup', async (req, res) => {
    const controller = new UserController();
    const response = await controller.signup(req.body);
    return res.send(response);
});
export default router;