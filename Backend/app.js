import express from "express";
import products from "./SRC/src/Models/products.js";
import branches from "./SRC/src/Models/branches.js";

const app = express();

//Que acepte el json desde postman
app.use(express.json());

app.use("/api/products", products);
app.use("/api/branches", branches);

export default app; 