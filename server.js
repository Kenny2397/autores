const express = require("express");

const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");

//Para usar Json y obtener datos de URL
app.use( express.json(), express.urlencoded({ extended: true }) );

//Para usar cookies
app.use(cookieParser());

//Permitir accesar desde un origen distinto
app.use (
    cors( {
        origin: "http://localhost:3000",
        //Credenciales
        credentials: true
    })
)

//Inicilizamos BD
require("./server/config/mongoose.config");

//Importamos rutas
const misRutas = require("./server/routes/autor.routes");
misRutas(app);

//Ejecutamos server
app.listen(8000, () => console.log("Sevidor listo!"));