import express from "express";
import wompiController from "../controllers/wompi_controller.js"

const router = express.Router();

router.route("/token").post(wompiController.generarToken)

router.route("/PaymentTest").post(wompiController.paymentTest)

router.route("/payment3Ds").post(wompiController.payment3ds);

export default router;