import express from "express";
import employeeController from "../controllers/employeeController.js";

//Uso Router() de la libreriea express
//Es la funcion que tiene todos los metodos http (get, post, put, delete)
const router = express.Router();

router.route("/")
    .get(employeeController.getEmployees)
    .post(employeeController.insertEmployee);

router.route("/:id")
    .delete(employeeController.deleteEmployee)
    .put(employeeController.updateEmployee);

export default router;