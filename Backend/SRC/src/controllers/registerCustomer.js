import nodemailer  from "nodemailer";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import bcrypts from "bcryptjs";



import customerModel from "../Models/customerModel.js";

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

    } catch (error) {
        
    }
}


