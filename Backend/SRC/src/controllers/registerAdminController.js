import nodemailer from "nodemailer";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import adminModel from "../Models/admins.js";
import { config } from "../config.js";
import { env } from "process";
import { text } from "stream/consumers";

const registerAdminController = {};

registerAdminController.registerAdmin = async (req, res) => {
    try {

        let {name, email, password, isVerified, loginAttempts, timeOut} = req.body;

        const existsAdmin = await adminModel.findOne({email});

        if (existsAdmin) {
            return res.status(400).json({message: "An account with this email direction already exists"});
        }
        const passwordHash = await bcrypt.hash(password, 10);

        const newAdmin = new adminModel({
            name,
            email,
            password,
            isVerified,
            loginAttempts,
            timeOut
        });
        
    } catch (error) {
        console.log("error " + error);
        return res.status(500).json({message: "internal server error" + error});
    }
}