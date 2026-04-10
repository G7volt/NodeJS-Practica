import express from "express";
import registerCustomer from "../controllers/registerCustomer.js";

const router = express.Router();

router.route("/").post(registerCustomer.register);
router.route("/verifyCodeEmail").post(registerCustomer.verifyCode);

export default router;