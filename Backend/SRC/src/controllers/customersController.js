import customerModel from "../Models/customers.js";

const customerController = {};

customerController.getCustomers = async (req, res) => {
    try {
        const customers = await customerModel.find();
        return res.status(200).json(customers)
    } catch (error) {
        console.log("error " + error)
        return res.status(500).json({message: "internal server error"})
    }
};

customerController.deleteCustomers = async (req, res) => {
    try {
        const deleteCustomer = await customerModel.findByIdAndDelete(req.params.id)
        if (!deleteCustomer){
            return res.status(404).json({message: "Cusomer not found"})
        }
        return res.status(200).json({message: "customer deleted"});
    } catch (error) {
        console.log("error " + error);
        return res.status(500).json({message: "internal server error"});
    }
}

customerController.updateCustomer = async(req, res) => {
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

       name = name?.trim(),
       email = email?.trim()

    if (name.length < 3 || name.length > 15) {
        return res.status(400).json({message: "invalid name"});
    }

    const updateCustomer = await customerModel.findByIdAndUpdate(
        req.params.id, 
        {
            name, 
            lastName,
            birthDate,
            email, 
            password, 
            isVerified, 
            loginAttempts,
            timeOut
        }, 
        {new: true},
    );

    if (!updateCustomer) {
        return res.status(404).json({message: "customer not found"});
    }
    return res.status(200).json({message: "customer updated"});
    } catch (error) {
        console.log("error: " + error)
        return res.status(500).json({message: "internal server error"})
    }
}

export default customerController;
