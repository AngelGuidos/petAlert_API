const User = require("../models/user.model");
const Org = require("../models/organization.model");
const debug = require("debug")("app:user:controller");

const { createToken, verifyToken } = require("../utils/jwt.tools");

const controller = {};

controller.register = async (req, res) => {
    try {
        //Obtener datos
        const { nombre, apellido, correo, contrasena, telefono, sexo, birthdate } = req.body;
        
        //Verificar si esta libre el correo 
        const user = await User.findOne({ correo: correo });
        const org = await Org.findOne({ correo: correo });

        if(user || org) {
            return res.status(409).json({ error: "Este correo ya esta en uso" });
        }

        //Encriptar 
        //Guardar el usuario

        const newUser = new User({
            nombre: nombre,
            apellido: apellido,
            correo: correo,
            contrasena: contrasena,
            telefono: telefono,
            sexo: sexo,
            birthdate: birthdate
        });

        await newUser.save();
        
        return res.status(201).json({ message: "Creado co exito" });
    } catch (error) {
        debug({error})
        return res.status(500).json({ error: "Error interno de servidor" });
    }
};

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
        const org = await Org.findOne({ correo: identifier });

        /*
        if (!user && !org){
            return res.status(404).json({ error: "El usuario no existe" });
        }
        //comparar contrasena
        if(!user.comparePassword(contrasena) || !org.comparePassword(contrasena)){
            return res.status(401).json({ error: "Cotrasena incorrecta" })
        }

        //Loggearlo
        const token = createToken(user._id);
        user.tokens = [token, ...user.tokens.filter(_token => verifyToken(_token)).splice(0,4)];
        //registrar tokens
        await user.save();*/
        //return res.status(200).json({ token: token });
        //comparar contrasena
        if (user){
            if(!user.comparePassword(contrasena)){
                return res.status(401).json({ error: "Cotrasena incorrecta" });
            }
            const token = createToken(user._id);
            user.tokens = [token, ...user.tokens.filter(_token => verifyToken(_token)).splice(0,4)];
            await user.save();
            return res.status(200).json({ token: token });
        } else if(org){
            if(!org.comparePassword(contrasena)){
                return res.status(401).json({ error: "Cotrasena incorrecta" });
            }
            const token = createToken(org._id);
            org.tokens = [token, ...org.tokens.filter(_token => verifyToken(_token)).slice(0,4)];
            await org.save();
            return res.status(200).json({ token: token });
        } else return res.status(404).json({ error: "El usuario no existe" });
        
        
    } catch (error) {
        debug(error);
        return res.status(500).json({ error: "Error inespreado" });
    }
}; 

controller.whoami = async (req, res) => {
    try {
      const { correo, _id } = req.user;
      return res.status(200).json({ _id, correo });
    } catch (error) {
      debug(error);
      return res.status(500).json({ error: "Error inesperado zzz" })
    }
}

module.exports = controller;