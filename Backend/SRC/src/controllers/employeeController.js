//#1- hacer un arrray de funcione

const employeeController = {};

//#2- import de la coleccion a usar
import employeModel from "../Models/employees.js";

//Select
employeeController.getEmployees = async (req, res) => {
    const employees = await employeModel.find();
    res.json(employees);
}

//Insert
employeeController.insertEmployee = async (req, res) => {
    //#1 - Solicitar los datos a guardar
    const {
        name, 
        lastName,
        salary, 
        DUI, 
        phone, 
        email, 
        password,
        idBRanches
    } = req.body;

    //#2. LLenar el modelo con los datos solicitados
    const newEmployees = new employeModel({
        name,
        lastName,
        salary,
        DUI,
        phone,
        email,
        password,
        idBRanches
    });

    //#3. Guardar el modelo en la base de datos
    await newEmployees.save();
    res.json({message: "Empleado Guardado"});
};

//Delete
employeeController.deleteEmployee = async (req, res) => {
    await employeModel.findByIdAndDelete(req.params.id);
    res.json({message: "Empleado Eliminado"});
}

//Update
employeeController.updateEmployee = async (req, res) => {
    const {name,
        lastName,
        salary,
        DUI,
        phone,
        email,
        password,
        idBRanches} = req.body;

        await employeModel.findByIdAndUpdate(req.params.id, {
            name,
            lastName,
            salary,
            DUI,
            phone,
            email,
            password,
            idBRanches
        });
        res.json({message: "Empleado Actualizado"});
};

export default employeeController;