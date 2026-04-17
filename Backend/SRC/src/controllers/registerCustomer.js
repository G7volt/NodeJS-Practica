import nodemailer  from "nodemailer";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import bcrypts from "bcryptjs";
import customerModel from "../Models/customers.js";
import { config } from "../config.js";
import { env } from "process";
import { text } from "stream/consumers";

const registerCustomer = {};

registerCustomer.register = async (req, res) => {
    try {
        let {
            name, 
            lastName,
            birthDate,
            email, 
            password, 
            isVerified, 
            loginAttempts,
            timeOut
        } = req.body

         //verificamos si el correo ya esta registrado
        const existsCustomer = await customerModel.findOne({email});
        if (existsCustomer) {
            return res.status(400).json({message: "email already exists"});
        }
        const passwordHash = await bcrypts.hash(password, 10);

        const newCustomer = new customerModel({
        name , 
        lastName,
        birthDate,
        email, 
        password: passwordHash, 
        isVerified: isVerified || false, 
        loginAttempts,
        timeOut
        });

        await newCustomer.save();

        //Generamos codigo aleatorio para verificar el correo
        const verificationCode = crypto.randomBytes(3).toString("hex")

        //Guardamos el codigo en un token
        const tokenCode = jsonwebtoken.sign(
            //1- Que vamos a guardar
            {email, verificationCode},
            //2- Secret Key
        config.JWT.secret,
        //3- Cuando expira?
        {expiresIn: "15m"}
        );

        res.cookie("verificationTokenCookie", tokenCode, {maxAge: 15 * 60 * 1000})

        //enviar un correo con el codigo de verificacion
        //1- transporter -> ¿Quien envia el correo?
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.email.user_email,
                pass: config.email.user_password
            }
        });

    //2- Quien recibira el correo?
    const mailOptions = {
        from: config.email.user_email,
        to: email,
        subject: "Verificacion de cuenta",
        text: "Para verificar su cuenta, utiliza el codigo " + verificationCode + " Expirara en 15 minutos"
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            console.log("error" + error)
            return res.status(500).json({message: "error"})
        }

        res.status(200).json({message: "email sent"})
    });

    

    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "internal server error" + error})
    }
};


registerCustomer.verifyCode = async (req, res) => {
    try {
        //1- Solicitamos el codigo que el usuario escibio en el frontend
        const { verificationCodeRequest } = req.body;

        //2- Obtener el token de la cookie
        const token = req.cookies.verificationTokenCookie

        //3- Extraer la informacion del token
        const decoded = jsonwebtoken.verify(token, config.JWT.secret);
        const { email, verificationCode: storedCode } = decoded;

        //4- comparar el token que escribio en el frontend con el guarado en el token
        if(verificationCodeRequest !== storedCode){
            return res.status(400).json({message: "Invalid code"})
        }


        //Si el codigo esta bien, entoces colocamos el campo "isVerified" en true

        const customer = await customerModel.findOne({email});
        customer.isVerified = true;
        await customer.save();

        res.clearCookie("verificationTokenCookie")

        res.json({message: "email verified succesfully"})

    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "internal server error" + error})
    }
}

export default registerCustomer;

