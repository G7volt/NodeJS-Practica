//Creo un array de metodos 

const productsController= {};

//Import del schema de la coleccion 
//que vamos a ocupar
import productsModel from "../Models/products.js";

//Select
productsController.getProducts = async (req, res) => {
    const products = await productsModel.find();
    res.json(products);
};

//Insert
productsController.insertProducts = async (req, res) => {
    //1- Solicictar campos
    const { name, price, description, stock, category, imageUrl } = req.body;
    //Crear una constante 
    const newProduct = new productsModel({
        name,
        price,
        description,
        stock,
        category,
        imageUrl
    });

    await newProduct.save();
    res.json({ message: "Producto creado correctamente" });
}

//Eliminar un producto
productsController.deleteProducts = async (req, res) => { 
    await productsModel.findByIdAndDelete(req.params.id);
    res.json({message: "Producto Eliminado"});
}

productsController.updateProducts = async (req, res) => { 
 //1- solicitar campos nuevos
    const { name, price, description, stock, category, imageUrl } = req.body;

    //2- Actuallizar el producto
    await productsModel.findByIdAndUpdate(req.params.id, {
        name, 
        price, 
        description, 
        stock, 
        category, 
        imageUrl
    }, { new: true })

    res.json({message: "Producto Actualizado"})
}

export default productsController;