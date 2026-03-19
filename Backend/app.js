import express from "express";
import productsRouters from "./SRC/src/routers/products.js";
import branchesRouters from "./SRC/src/routers/branches.js";
import employeesRouters from "./SRC/src/routers/employees.js";
import reviewRouters from "./SRC/src/routers/review.js";

const app = express();

//Que acepte el json desde postman
app.use(express.json());

app.use("/api/products", productsRouters);
app.use("/api/branches", branchesRouters);
app.use("/api/employees", employeesRouters);
app.use("/api/reviews", reviewRouters);

export default app; 