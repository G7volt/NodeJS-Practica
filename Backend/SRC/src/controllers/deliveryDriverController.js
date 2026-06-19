import deliveryDriverModel from "../Models/deliveryDriversModel.js";
import {v2 as cloudinary} from "cloudinary"; //v2 es la version de cloudinary

//array de funciones
const deliveryDriverController = {}

//select 
deliveryDriverController.getAll= async (req, res) => {
    try {
        const drivers = await deliveryDriverModel.find()
        if (!drivers) {
            return res.status(404).json({message: "Drivers not found"})
        }
        return res.status(200).json(drivers)
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "INternal server error"})
    }
}

deliveryDriverController.insertDriver = async (req, res) => {
    try {
        
        //Solicito los valores que insertare en la base de datos
        const {name, phone, cars, isActive} = req.body;
        //No pido la imagen, esta se la manda por postman como archivo
        //solo se pide el nombre del array, no los objetos dentro del array

        //2- LLenar el modelo
        const newDriver = new deliveryDriverModel({
            name,
            phone,
            image: req.file.path,
            public_id: req.file.filename,
            cars,
            isActive
        })
        
        //guardamos todo en la base de datos
        await newDriver.save()
        
        return res.status(200).json({message: "Delivery driver Saved"})

    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "INternal server error"})
    }
}

//Eliminar
deliveryDriverController.deleteDriver = async (req, res) => {
    try {
        //Buscamos el repartidos a eliminar
        const driverFound = deliveryDriverModel.findById(req.params.insertDriver)

        //eliminamos la imagen de cloudinary
        await cloudinary.uploader.destroy(driverFound.public_id)

        //eliminamos el repartidor de la base de datos
        await deliveryDriverModel.findByIdAndDelete(req.params.id)

        return res.status(200).json({message: "Driver deleted"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

//Actualizar
deliveryDriverController.updateDriver = async(req, res) => {
    try {
        //Solicito los nuevos datos
        const {name, phone, cars, isActive} = req.body;


        //Identificar el repartidor a actualizar
        const driverFound = await deliveryDriverModel.findById(req.params.id)

        const updateDriver = {
            name, phone, cars, isActive
        }

        //En caso de que actualizen la imagen
        if(req.file){

            //Eliminamos la imagen ya existente
            await cloudinary.uploader.destroy(driverFound.public_id)

            updateData.image = req.file.path,
            updateData.public_id = req.file.filename

        }

        //Guardamos todo en la base de datos
        await deliveryDriverModel.findByIdAndUpdate(
            req.params.id,
            updateData,
            {new: true}
        )

        return res.status(200).json({message: "Dirver updated"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

export default deliveryDriverController;