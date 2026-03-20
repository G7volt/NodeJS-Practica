// Array de funciones
const brandController = {}

import brandsModel from "../Models/brands.js";

//Select 
brandController.getBrand = async (req, res) => {
    try {
        const brands = await brandsModel.find();
        return res.status(200).json(brands)
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server error"})
    }
}

//Insert
brandController.insertBrand = async (req, res) => {
    try {
        let {name, slogan, address, isActive} = req.body

        name = name?.trim();
        slogan = slogan?.trim();
        address = address?.trim();

        //Validacion de datos nulos
        if (!name || !slogan || !address){
            return res.status(400).json({message: "All fields are required"})
        }

        //Validacion de tamaño
        if (name.lenght < 3){
            return res.status(400).json({message: "name too short"})
        }

         if (name.lenght > 100){
            return res.status(400).json({message: "name too long"})
        }

        //Guardado en la base
        const newBrand = new brandsModel({name, slogan, address, isActive})
        await newBrand.save()

        return res.status(201).json({message: "Brand Saved"})

    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server error"})
    }
}

//Eliminar
brandController.deleteBrand = async (req, res) => {
    try {
        const deleteBrand = await brandsModel.findByIdAndDelete(req.params.id)

        //Validacion por si no fue borrado
        if(!deleteBrand){
            return res.status(404).json({message: "brand not found"})
        }

        return res.status(200).json({message: "brand deleted"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server error"})
    }
}

//Actualizar
brandController.updateBrand = async (req, res) => {
    try {

        //Pedimos los nuevos datos
        let {name, slogan, address, isActive} = req.body

        name = name?.trim();
        slogan = slogan?.trim();
        address = address?.trim();

        //Validacion de tamaño
        if (name.lenght < 3){
            return res.status(400).json({message: "name too short"})
        }

         if (name.lenght > 100){
            return res.status(400).json({message: "name too long"})
        }

        //Actualizamos
        const updateBrands = await brandsModel.findByIdAndUpdate(
            req.params.id, {
            name, 
            slogan, 
            address, 
            isActive
            }, {new: true}
        )

        if (!updateBrands){
            return res.status(404).json({message: "Brand not found"})
        }

        return res.status(200),json({message: "Brand updated"})


    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal Server error"})
    }
}

export default brandController;