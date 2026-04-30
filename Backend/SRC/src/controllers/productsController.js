//Creo un array de metodos 

const productsController= {};

import products from "../Models/products.js";
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

//Buscar Producto por ID
productsController.getProductById = async (req, res) => {
    try {
        const product = await productsModel.findById(req.params.id)

        if(!product){
            return res.status(400).json({message: "No se encontro el producto"})
        }

        return res.status(200).json(product)

    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "internal server error"})
    }
}

//Buscar Productos por un Nombre
productsController.getProductByName = async (req, res) => {
    try {
    
        //1- Solicitar datos
        const {name} = req.body;
        const products = await productsModel.find({
            name: {$regex: name, $options: "i"} //$regex: acepta coincidencias con la variable, en este caso name
                                                //$options: no distingue entre mayusculas y minusculas
        });

        if (!products) {
             return res.status(404).json({message: "Producto No encontrado"})
        }

        return res.status(200).json(products);

    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "internal server error"})
    }
}

productsController.getLowStock = async(req, res) => {
    try {
        //$lt: menor que, $gt: mayor que, $lte: menor o igual que, $gte mayor o igual que
        const products = await productsModel.find({stock: {$lt: 5}})

        if (!products) {
            return res.status(404).json({message: "no hay productos con bajo stock"})
        }

         return res.status(200).json(products)



    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "internal server error"})
    }
}

productsController.getProductsByPriceRange = async(req, res) => {
    try {
        
        const {min, max} = req.body

        const products = await productsModel.find({
            price: {$gte: min, $lte: max}
        })

        if(!products){
            return res.status(404).json({message: "Productos no encontrados"})
        }

        return res.status(200).json(products)

    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "internal server error"})
    }
}

//contar cuantos elementos hay en una coleccion
productsController.countProducts = async(req, res) => {
    try {
        
        const count = await productsModel.countDocuments();

        return res.status(200).json(count)

    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "internal server error"})
    }
}

export default productsController;