import express from "express";
import customerController from "../controllers/customersController.js";

const router = express.Router();

router.route("/")
    .get(customerController.getCustomers)

router.route("/:id")
    .delete(customerController.deleteCustomers)
    .put(customerController.updateCustomer) 

export default router;


