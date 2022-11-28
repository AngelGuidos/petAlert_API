const Mongoose = require("mongoose");
const debug = require("debug")("app:mongoose");

const dbhost = process.env.DBHOST || "localhost";
const dbport = process.env.DBPORT || "27017";
const dbname = process.env.DBNAME || "petAlertAPI";

const dburi = process.env.DBURI || `mongodb://${dbhost}:${dbport}/${dbname}`;

const connect = async() => {
    debug(dburi);
    try{
        await Mongoose.connect(dburi);
        debug("conexion exitosa");
    } catch (error) {
        debug("Error en la conexion de la base de datos");
        process.exit(1);
    }
}

module.exports= {
    connect
}