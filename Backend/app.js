import express from "express";
import productsRouters from "./SRC/src/routers/products.js";
import branchesRouters from "./SRC/src/routers/branches.js";
import employeesRouters from "./SRC/src/routers/employees.js";
import reviewRouters from "./SRC/src/routers/review.js";
import brandsRouter from "./SRC/src/routers/brands.js";
import adminsRouter from "./SRC/src/routers/admins.js";
import registerCustomer from "./SRC/src/routers/registerCustomer.js";
import cookieParser from "cookie-parser";
import customerRouter from "./SRC/src/routers/customers.js";
import loginCustomer from "./SRC/src/routers/loginCustomer.js";
import logOut from "./SRC/src/routers/logOut.js";
import recoveryPassword from "./SRC/src/routers/recoveryPassword.js"
import cors from "cors";
import limiter from "./SRC/src/middlewares/rateLimiter.js"

const app = express();
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    //permitir el envio de cookies y credenciales
    credentials: true
}))

app.use(limiter);

app.use(cookieParser());

//Que acepte el json desde postman
app.use(express.json());

app.use("/api/products", productsRouters);
app.use("/api/branches", branchesRouters);
app.use("/api/employees", employeesRouters);
app.use("/api/reviews", reviewRouters);
app.use("/api/brands", brandsRouter);
app.use("/api/admins", adminsRouter);
app.use("/api/customers", customerRouter);
app.use("/api/registerCustomers", registerCustomer);
app.use("/api/loginCustomers", loginCustomer);
app.use("/api/logOut", logOut);
app.use("/api/recoveryPassword", recoveryPassword);

export default app; 