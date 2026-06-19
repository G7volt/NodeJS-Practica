import express from "express";
import productsController from "../controllers/productsController.js";
import { get } from "mongoose";

//Router() nos ayudara a colocar los metodos
//que tendra el endpoint
const router = express.Router();

router.route("/")
.get(validateAuthCookie(["customer"]), productsController.getProducts)
.post(productsController.insertProducts)

router.route("/searchByName")
.post(productsController.getProductByName);

router.route("/low-stock")
.get(productsController.getLowStock);

router.route("/price-range")
.get(validateAuthCookie(["customer"]), productsController.getProductsByPriceRange);

router.route("/count")
.get(productsController.countProducts)

router.route("/:id")
.get(productsController.getProductById)
.put(productsController.updateProducts)
.delete(productsController.deleteProducts)



export default router;