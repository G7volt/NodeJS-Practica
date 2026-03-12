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