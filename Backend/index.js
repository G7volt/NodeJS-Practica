import app from "./app.js";
import "./database.js"

//creamos la funcion 
//que se encarga de ejecutar el servidor

async function main() {
    app.listen(4000);
}

    main();