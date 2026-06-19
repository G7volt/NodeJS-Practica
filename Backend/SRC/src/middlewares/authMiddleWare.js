import jsonwebtoken from "jsonwebtoken";
import { config } from "../config.js";

export const validateAuthCookie = (allowedTypes = []) => {
    return (req, res, next) => {
        try {
            //1- Extraer el token que esta en la cookie (AuthCookie)
            //Ya que en esa cookie esta el tipo de usuario que inicio sesion

            const {authCookie} = req.cookies;

            if(!authCookie){
                return res.status(403).json({message: "No cookie found, auth required"})
            };

            //2- Extraer la info de la cookie
            const decoded = jsonwebtoken.verify(authCookie, config.JWT.secret);

            if (!allowedTypes.includes(decoded.usersType)) {
                return res.status(401).json({message: "Access denied"})
            }

            //Si tiene acceso
            next()

        } catch (error) {
            console.log("error " + error);
        return res.status(500).json({message: "internal server error" + error});
        }
    }
}

export default validateAuthCookie;