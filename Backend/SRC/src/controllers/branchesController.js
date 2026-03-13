const branchesController = {}; 

import branchModels from "../Models/branches.js";

branchesController.getBranches = async (req, res) => {
    const branches = await branchModels.find();
    res.json(branches);
}

branchesController.insertBranches = async (req, res) => {
    const {name, adress, schedule, isActive} = req.body;
    const newBranch = new branchModels({
        name, 
        adress, 
        schedule, 
        isActive});
    await newBranch.save();
    res.json({message: "Sucursal creada correctamente"});
    res.status(201).json(newBranch);
}

branchesController.updateBranches = async (req, res) => {
    const {name, adress, schedule, isActive} = req.body;
    await branchModels.findByIdAndUpdate(req.params.id, {
        name, 
        adress, 
        schedule, 
        isActive
    }, {new: true});

        res.json({message: "Sucursal actualizada correctamente"});
}

branchesController.deleteBranches = async (req, res) => {
    await branchModels.findByIdAndDelete(req.params.id);
    res.json({message: "Sucursal eliminada correctamente"});
}

export default branchesController;