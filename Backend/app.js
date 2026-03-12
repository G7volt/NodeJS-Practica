import express from "express";
import products from "./SRC/src/Models/products";

const app = express();

app.use("/api/products", productRouters);

export default app; 