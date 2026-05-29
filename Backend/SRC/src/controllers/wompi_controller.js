import { urlencoded } from "express";
import fetch from "node-fetch";

const wompiController = {};

wompiController.generarToken = async (req, res) => {
    try {
        
        const response = await fetch("https://id.wompi.sv/connect/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
                grant_Type: config.wompi.grant_type,
                audience: config.wompi.audience,
                client_id: config.wompi.client_id,
                client_secret: config.wompi.client_secret 
            })
        })

        if (!response.ok){
            const error = await response.text;
            return res.status(500).json({error})
        }

        const data = await response.json()
        return res.status(200).json(data)

    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

wompiController.paymentTest = async (req, res) => {
    try {
        
        const {token, formData} = req.body;

        const response = await fetch("https://api.wompi.sv/TransaccionCompra/tokenizadaSin3Ds", {
            method: "POST",
            headers: {
                "content_type": "application/json",
                Autorization: `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        })

        if(!PaymentResponse.ok) {
            const error = await response.text()
            return res.status(500).json(error)
        }

        const data = await response.json()
        return res.status(200).json(data)

    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

//Endpoint para el pago real con tarjeta, se pueden hacer prubeas con saldo de $0.01 de dinero
wompiController.payment3ds = async (req, res) => {
    try {
        const {token, formData} = req.body
        const response = await fetch("https://api.https://api.wompi.sv/TransaccionCompra/3DS", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Autorization: `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        });
        
        if (!response.ok) {
            const error = await response.text();
            return res.status(500).json({error})
        }

        const data = await response.json;
        return res.status(200).json(data)

    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

export default wompiController;