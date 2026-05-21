import providers from '../Models/providers.js';
import {providerModel} from '../models/providersModel.js';

import {v2 as cloudinary} from 'cloudinary';

providersController = {};

providersController.getAllProviders = async (req, res) => {
    try{

        const providers = await providerModel.find();

        return res.status(200).json(providers);

     } catch (error) {
        console.log("error" + error)
       return  res.status(500).json({ message: 'Error fetching providers', error });
     }
}

providersController.insertProvider = async (req, res) => {
    try {
        let {name, phone} = req.body;

        const newProvider = new providerModel({
            name,
            phone,
            image: req.file.path,
            public_id: req.file.filename
        })
        await newProvider.save();

        return res.status(200).json({message: "Proveedor agregado"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error: " + error})
    }
}

providersController.deleteProvider = async (req, res) => {
   try {
        const providerFound = await providerModel.findByIdAndDelete(req.params.id);

        if (!providerFound) {
            return res.status(400).json({message: "Proveedor no encontrado"})
        }
        return res.status(200).json({message:"Proveedor eliminado"})
   } catch (error) {
        console.log("error" + error);
        return res.status(500).json({message: "Internal server error"})
   }

}

providersController.updateProvider = async (req, res) => {
    try {

        let {name, phone} = req.body;

        const providerFound = await providers.findById(req.params.id)

        const providerModified = {name, phone}

        if(req.file){
            await cloudinary.uploader.destroy(providerFound.public_id)
            providerModified.image = req.file.path;
            providerModified.public_id = req.file.filename
        }

        await providers.findByIdAndUpdate(re.params.id, providerModified, {new: true});

        return res.status(200).json({message: "Proveedor Modificaodo"})
        
    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({message: "Internal server error"})
    }
}

export default providersController;