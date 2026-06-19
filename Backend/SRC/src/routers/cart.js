import e from "express";
import cartController from "../controllers/cartController.js";

const router = e.Router();

router.route("/")
.get(cartController.getAllCarts)
.post(cartController.insertNewCart)

router.route("/:id")
.get(cartController.getCartById)
.put(cartController.updateCart)
.delete(cartController.deleteCart)

export default router;