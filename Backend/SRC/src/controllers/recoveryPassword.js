import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import nodemailer from "nodemailer";

import {config} from "../config.js";

import customerModel from "../Models/customers.js";

import HTMLRecoveryEmail from "../utils/RecoveryCode.js"
import { error, info } from "console";
import { decode } from "punycode";
import { json } from "express";

const recoveryPassword = {};

recoveryPassword.requestCode = async (req, res) => {
    try {

        const {email} = req.body;
        //Validar correo solo si esta en la base de datos
        const userFound = await customerModel.findOne({email});

        if (!userFound) {
            return res.status(404).json({message: "user not found"})
        }

        //Generar numero aleatorio
        const randomCode = crypto.randomBytes(3).toString("hex");

        //guardar en un token
        const token = jsonwebtoken.sign(
            //1- que vamos a guardar? - Payload

            {email, randomCode, userType: "customer", verified: false},

            //2- Secret Key
            config.JWT.secret,
            //3- Cuando expirara
            {expiresIn: "15m"}

        )

        res.cookie("recoveryCookie", token, {maxAge: 15 * 60 * 1000});

        //Enviamos por correo electronico 
        //El codigo que generamos

        //1- Quien envia el email?
        const transport = nodemailer.createTransport({
            service: "gmail",
            auth:{
                user: config.email.user_email,
                pass: config.email.user_password
            }
        })

        const mailOptions = {
            from: config.email.user_email, 
            to: email, 
            subject: "codigo de recuperacion de contraseña",
            body: "El codigo vence en 15 minutos",
            html:  HTMLRecoveryEmail(randomCode),
        }; 

        transport.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({message: "Error al enviar corrreo"})
            }
        })

        return res.status(200).json({message: "email sent"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"});
    }
};

recoveryPassword.verifyCode = async (req, res) => {
    try {
        
        //1- solicitamos los datos
         const { code } = req.body;

         //Obtenemos la informacion que esta dentro del token  y accedemos a la cookie
         const token = req.cookies.recoveryCookie
         const decoded = jsonwebtoken.verify(token, config.JWT.secret)

         if(code !== decoded.randomCode){
            return res.status(400).json({message: "invalid code"})
         }

         //En cambio si escribe bien el codigo colocaremos el token que ya esta verificado. 
         const newToken = jsonwebtoken.sign(
            //Que guardaremos?
            {email: decoded.email, userType: "customer", verified: true},
            //secret key
            config.JWT.secret,
            //Cuando expira?
            {expiresIn: "15m"}
         )

        res.cookie("recoveryCookie", newToken, {maxAge: 15 * 60 * 1000});

        return res.status(200).json({message: "Code verified succesfully"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"});
    }
}; 

recoveryPassword.newPassword = async (req, res) => {
    try {
        
        //1- solicitar datos
        const {newPassword, confirmNewPassword} = req.body;

        if(newPassword != confirmNewPassword){
            return res.status(400).json({message: "passwords doesn't match"})
        }

        const token = req.cookies.recoveryCookie;
        const decoded = jsonwebtoken.verify(token, config.JWT.secret)

        if (!decoded.verified) {
            return res.status(400).json({message: "code not verified"})
        }

        //Encriptar la nueva contrasñea
        const passwordHash = await bcrypt.hash(newPassword, 10)

        await customerModel.findOneAndUpdate(
            {email: decoded.email},
            {password: passwordHash},
            {new: true}
        )

        res.clearCookie("recoveryCookie");

        return res.status(200).json({message: "Password updated"})

    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"});
    }
}

export default recoveryPassword;