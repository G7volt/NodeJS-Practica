import providers from "../modetls/providers.js";
 
import { v2 as cloudinary } from "cloudinary";
 
const providerController = {};
 
providerController.getAll = async(req, res) => {
    try {
        const get = await providers.find();
        return res.status(200).json(get);
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}
 
providerController.insert = async(req, res) => {
    try {
        let { name, phone } = req.body;
 
        const newProvider = new providers({
            name,
            phone,
            image: req.file.path,
            public_id: req.file.filename
        })
 
        await newProvider.save();
 
        return res.status(200).json({ message: "Proveedor agregado con exito" })
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}
 
providerController.delete = async (req, res) => {
    try {
        const deleteProvide = await providers.findByIdAndDelete(req.params.id);
 
        if(deleteProvide){
        return res.status(400).json({ message: "Proveedor not found" })
 
        }
 
        return res.status(200).json({ message: "Proveedor agregado con exito" })
 
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}
 
providerController.update = async(req, res) => {
    try {
        let { name, phone } = req.body;
 
        const ProviderFound = await providers.findById(req.params.id)
 
        const providerModified = {
            name,
            phone
        }
 
        if(req.file){
            await cloudinary.uploader.destroy(ProviderFound.public_id)
            providerModified.image = req.file.path;
            providerModified.public_id = req.file.filename;
        }
 
        await providers.findByIdAndUpdate(req.params.id, providerModified, {new: true});
 
        return res.status(200).json({ message: "Proveedor modificado con exito" });
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}
 
export default providerController;