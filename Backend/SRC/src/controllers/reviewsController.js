const reviewController = {};

import reviewModel from "../Models/reviews.js";

//Select
reviewController.getReviews = async (req, res) => {
    const reviews = await reviewModel.find();
    res.json(reviews);
}

reviewController.insertReview = async (req,res) => {
    const {
        idEmployee,
        idProduct,
        rating,
        comment
    } = req.body;

    const newReview = new reviewModel({
        idEmployee,
        idProduct,
        rating,
        comment
    });

    await newReview.save();
    res.json({message: "Review Guardada"});
}

reviewController.deleteReview = async (req, res) => {
    await reviewModel.findByIdAndDelete(req.params.id);
    res.json({message: "Review Eliminada"})
}

reviewController.updateReview = async (req, res) => {
    const {
        idEmployee,
        idProduct,
        rating,
        comment
    } = req.body;

    await reviewModel.findByIdAndUpdate(req.params.id, {
        idEmployee,
        idProduct,
        rating,
        comment
    });
    res.json({message: "Review Actualizada"});
};

export default reviewController;