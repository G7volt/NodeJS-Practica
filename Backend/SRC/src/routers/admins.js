import express from "express";
import adminsController from "../controllers/adminsController.js";

//Uso de Router() para asignar los metodos
const router = express.Router()

router.route("/")
.get(adminsController.getAdmin)
.post(adminsController.insertAdmin)

router.route("/:id")
.put(adminsController.updateAdmin)
.delete(adminsController.deleteAdmin)

export default router;