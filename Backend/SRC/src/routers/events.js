import express from "express";
import eventController from "../controllers/eventsController.js";

const router = express.Router();

router.route("/")
.get(eventController.getEvents)
.post(eventController.insert)

router.route("/:id")
.put(eventController.update)
.delete(eventController.delete)

export default router;
