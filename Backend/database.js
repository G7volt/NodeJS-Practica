import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/pricemartDB")

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