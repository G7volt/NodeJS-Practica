import express from "express";
import reviewController from "../controllers/reviewsController.js";

const router = express.Router();

router.route("/")
    .get(reviewController.getReviews)
    .post(reviewController.insertReview);

router.route("/:id")
    .delete(reviewController.deleteReview)
    .put(reviewController.updateReview);

export default router;