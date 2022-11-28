const Org = require("../models/organization.model");
const User = require("../models/user.model");
const debug = require("debug")("app:authOrg:controller");

const { createToken, verifyToken } = require("../utils/jwt.tools");

const controller = {};

controller.registerOrg = async (req, res) => {
    try {
        //Obtener datos
        const { nombre, correo, contrasena, telefono, direccion } = req.body;
        
        //Verificar si esta libre el correo 
        const org = await Org.findOne({ correo: correo });
        const user = await User.findOne({ correo: correo });

        if(org || user) {
            return res.status(409).json({ error: "Este correo ya esta en uso" });
        }

        const newOrg = new Org({
            nombre: nombre,
            correo: correo,
            contrasena: contrasena,
            telefono: telefono,
            direccion: direccion
        });

        await newOrg.save();
        
        return res.status(201).json({ message: "Creado co exito" });
    } catch (error) {
        debug({error})
        return res.status(500).json({ error: "Error interno de servidor" });
    }
};

controller.login = async (req, res) => {
    try {
        const { identifier, contrasena } =  req.body;
        //Existe?
        const user = await User.findOne({ correo: identifier });
        
        if (!user){
            return res.status(404).json({ error: "El usuario no existe" });
        }
        //comparar contrasena
        
        if(!user.comparePassword(contrasena)){
            return res.status(401).json({ error: "Cotrasena incorrecta" })
        }

        //Loggearlo
        const token = createToken(user._id);
        user.tokens = [token, ...user.tokens.filter(_token => verifyToken(_token)).splice(0,4)];

        await user.save();
        
        //registrar tokens
        
        return res.status(200).json({ token: token });
    } catch (error) {
        debug(error);
        return res.status(500).json({ error: "Error inespreado" });
    }
}; 

module.exports = controller;