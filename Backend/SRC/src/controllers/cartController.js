import cartModel from "../Models/cart.js";
import productsModel from "../Models/products.js"

const cartController = {};

cartController.getAllCarts = async (req, res) => {

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
            status: "Active"
        })

        await newCart.save()
        return res.status(200).json({message: "Carrito Guardado"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

cartController.updateCart = async (req, res) => {

    try {
        const {customerId, products, status} = req.body;

        let total = 0;
        let newProducts = [];

        for( let s = 0; s < products.length; s++ ) {
            //Buscamos el producto en la BD
            const product = await ProductModel.findById(products[s].productId);

            if(!product){
                return res.status(400).json({message: `Product with not found`, id: products[s].productId});
            }

            let subtotal;

            if(products[s].gratis){
                subtotal = 0;
            }else{
                subtotal = product.price * products[s].quantity;
            }

            total += subtotal;

            newProducts.push({
                productId: products[s].productId,
                quantity: products[s].quantity,
                subtotal
            });
        }

        const updateCart = await CarModel.findByIdAndUpdate(req.params.id, {
            customerId,
            products: newProducts,
            total,
            status: "Active"
        },
        {new: true});

        if(!updateCart){
            return res.status(404).json({message: "Cart not found"});
        }

        res.status(200).json({ message: "Cart updated successfully" });
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

cartController.deleteCart = async (req, res) => {
    try {
        const deletedCart = await CarModel.findByIdAndDelete(req.params.id);

        if(!deletedCart){
            return res.status(404).json({message: "Cart not found"});
        }
        res.status(200).json({ message: "Cart deleted successfully" });
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

export default cartController;