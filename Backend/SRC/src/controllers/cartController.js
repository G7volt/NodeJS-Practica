import cartModel from "../Models/cart.js";
import productsModel from "../Models/products.js"

const cartControler = {};

cartControler.getAllCarts = async (req, res) => {

    try {

        const carts = await cartModel.find()
        .populate("customerId", "name email")
        .populate("products.productId", "name price")

        return res.status(200).json(carts)
        
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }

}

cartController.getCartById = async (req, res) => {
    
    try {
        const cart = cartModel.findById(req.params.id)
        .populate("customerId", "name email")
        .populate("products.productId", "name price")

        return res.status(200).json(cart)
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

cartController.insertNewCart = async (req, res) => {
    try {

        //1- Solicito los datos a ingresar
        const {customerId, products, status} = req.body;

        //calcular el subtotal y el total

        //Variable para guardar el total a pagar
        let total = 0

        let newProducts = []

        //de todos los productos, voyr a recorrer uno por uno
        //calculando el subtotal y el total
        for(let i = 0; i < products.length; i++){
            //Buscamos el producto en la base de datos4
            const productFound = await productsModel.findById(products[i].productId)

            //calcular el subtotal  Producto encontrado * Cantidad de productos
            const subtotal = productFound.price * products[i].quantity

            //Aca poner el calculo del descuento del producto

            //calculamos el total
            total += subtotal

            //guardamos el producto junto con la cantidad y el subtotal
            newProducts.push({
                productId: products[i].productId,
                quantity: products[i].quantity,
                subtotal: subtotal
            })
        }

         const newCart = new cartModel({
            customerId, 
            products: newProducts,
            total, 
            status
        })

        await newCart.save()
        return res.status(200).json({message: "Carrito Guardado"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

cartControler.updateCart = async (req, res) => {

    try {
        
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}