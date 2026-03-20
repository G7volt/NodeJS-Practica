import express from "express";
import brandController from "../controllers/brandsController.js";

//Se usa Router() para asignar los metodos
const router = express.Router()

router.route("/")
.get(brandController.getBrand)
.post(brandController.insertBrand)

router.route("/:id")
.put(brandController.updateBrand)
.delete(brandController.deleteBrand)

export default router