import app from "./app.js";
import "./database.js"
import { config } from "./SRC/src/config.js";

//creamos la funcion 
//que se encarga de ejecutar el servidor

async function main() {
    app.listen(config.server.port);
    console.log("Servidor escuchando en el puerto " + config.server.port);
}

    main();