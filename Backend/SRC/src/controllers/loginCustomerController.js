import bcrypt from "bcryptjs";//Metodo de encriptacion
import jsonwebtoken from "jsonwebtoken";//Token

import customerModel from "../Models/customers.js"

import {config} from "../config.js"

const loginCustomerController = {};

loginCustomerController.login = async (req, res) => {
    try {

        //1- Solicitar el correo y constraseña
        const {email, password} = req.body; 

        //Verificar si el correo existe en la BD
        const userFound = await customerModel.findOne({email});

        //si no lo encuentra
        if (!userFound) {
            return res.status(404).json({message: "Customer not found"})
        }

        //verificar si la cuenta esta bloqueada
        if(userFound.timeOut && userFound.timeOut > Date.now()){
            return res.status(403).json({message: "Cuenta bloqueada, demasiados intentos"})
        }

        //verificar la contraseña
        const isMatch = await bcrypt.compare(password, userFound.password)

        if(!isMatch){
            //Se le suma +1 al campo de intentos fallidos
            userFound.loginAttempts = (userFound.loginAttempts || 0) + 1
            //bloquear la cuenta luego de 5 intentos
            if (userFound.loginAttempts >= 5) {
                userFound.timeOut = Date.now() +15 * 60 * 1000
                userFound.loginAttempts = 0;

                await userFound.save();
                return res.status(403).json({message: "Cuenta blooqueada"})
            }

            await userFound.save();

            return res.status(403).json({message: "Contraseñaa incorrecta"})
        }

        userFound.loginAttempts = 0;
        userFound.timeOut = null;
        await userFound.save();

        //Generar el token
        const token = jsonwebtoken.sign(
            //1- ¿Que guardaremos?
            {id: userFound._id, userType: "customer"},

            //2-Secret Key
            config.JWT.secret, 

            //3- Tiempo de expiracion
            {expiresIn: "30d"}
        );

        //!------------IMPORTANTE------------!
        //Guardamos el token en una cookie
        res.cookie("authCookie", token);


        return res.status(200).json({message: "Inicio de sesion Exitoso"})
    } catch (error) {
        console.log("error " + error);
        return res.status(500).json({message: "internal server error" + error});
    }
}

export default loginCustomerController;