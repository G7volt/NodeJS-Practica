const adminsController = {}

import adminsModel from "../Models/admins.js"

//select
adminsController.getAdmin = async (req, res) => {
    try {
        const admins = await adminsModel.find()
        return res.status(200).json(admins)
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server error"})
    }
}

//Insert
adminsController.insertAdmin = async (req, res) => {
    try {

        let {name, email, password, isVerified} = req.body

        name = name?.trim()
        email = email?.trim()
        password = password?.trim()

        //Validacion de datos nulos
        if (!name || !email || !password){
            return res.status(400).json({message: "All fields are required"})
        }

        //Validacion de tamaño
        if (name.lenght < 3){
            return res.status(400).json({message: "name too short"})
        }

         if (name.lenght > 100){
            return res.status(400).json({message: "name too long"})
        }

        if (password.lenght <= 8){
            return res.status(400).json({message: "password has to be at least 8 characters"}) 
        }

        //Validacion de email ReGex
        const emailRegex = /^[^\s@]+@[^\s]@+\.[^\s@]+$/
        if (!emailRegex.test(email)){
            return res.status(400).json({message: "Invalid email format"})
        }


        //Guardado de los datos en la base
        const newAdmin = new adminsModel({name, email, password, isVerified})
        await newAdmin.save()

        return res.status(201).json({message: "Admin Saved"})
        
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server error"})
    }
}

//Eliminar
adminsController.deleteAdmin = async (req, res) => {
    try {
        const deleteAdmin = await adminsModel.findByIdAndDelete(req.params.id)

        //Validacion por si no fue borrado
        if(!deleteAdmin){
            return res.status(404).json({message: "Admin not found"})
        }

        return res.status(200).json({message: "Admin deleted"})

    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server error"})
    }
}

//Actualizar
adminsController.updateAdmin = async (req, res) => {
    try {

        //Pedimos los nuevos datos
        let {name, email, password, isVerified} = req.body

        name = name?.trim()
        email = email?.trim()
        password = password?.trim()

        //Validacion de tamaño
        if (name.lenght < 3){
            return res.status(400).json({message: "name too short"})
        }

         if (name.lenght > 100){
            return res.status(400).json({message: "name too long"})
        }

        //Validacion de password
        if (password.lenght <= 8){
            return res.status(400).json({message: "password has to be at least 8 characters"}) 
        }

        //Validacion de email ReGex
        const emailRegex = /^[^\s@]+@[^\s]@+\.[^\s@]+$/
        if (!emailRegex.test(email)){
            return res.status(400).json({message: "Invalid email format"})
        }
        
        //Actualizacion de los datos en la base
        const updateAdmin = await adminsModel.findByIdAndUpdate(req.params.id, {
            name, 
            email, 
            password, 
            isVerified}, {new: true}
        )

        if (!updateAdmin){
            return res.status(404).json({message: "Admin not found"})
        }

        return res.status(200).json({message: "Admin updated"})

    } catch (error) {
         console.log("error" + error)
        return res.status(500).json({message: "Internal Server error"})
    }
}

export default adminsController;