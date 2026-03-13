import express from "express";
import products from "./SRC/src/Models/products.js";

const app = express();

//Que acepte el json desde postman
app.use(express.json());

app.use("/api/products", products);

export default app; 