import mongoose from "mongoose";
import { config } from "./SRC/src/config.js";

mongoose.connect(config.db.URI)

const db = mongoose.connection;

db.once("open", () => {
    console.log("Conexión a la base de datos establecida");
})

db.on("disconnected", () => {
    console.log("Conexión a la base de datos perdida");
});

db.on("error", (error) => {
    console.error("Error en la conexión a la base de datos: " + error);
})