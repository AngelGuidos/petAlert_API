const User = require("../models/user.model");
const debug = require("debug")("app:user:controller");

const controller = {};

controller.create = async (req, res) => {
    try {
        const { nombre, apellido, correo, contrasena, telefono, sexo, birthdate } = req.body;
    
        //validacion
        const user = new User({
            nombre: nombre,
            apellido: apellido,
            correo: correo,
            contrasena: contrasena,
            telefono: telefono,
            sexo: sexo,
            birthdate: birthdate
        });
    
        const newUser = await user.save();
    
        if(!newUser){
            return res.status(409).json({ error: "Error al crear el user" });
        }
    
        return res.status(201).json(newUser);
        
    } catch (error) {
        debug({error})
        return res.status(500).json({ error: "Error interno de servidor" });
    }
};


controller.findAll = async (req, res) => {
    try {
        
        const users = await User.find({ hidden: false });

        return res.status(200).json({ users });

    } catch (error) {
        debug({error})
        return res.status(500).json({ error: "Error interno de servidor" });
    }
};


controller.findOneById = async (req, res) => {
    try {
        const { identifier } = req.params;

        const user = await User.findById(identifier)

        if(!user){
            return res.status(404).json({ error: "User no encontrado" })
        }
        return res.status(200).json(user)
    } catch (error) {
        debug({error})
        return res.status(500).json({ error: "Error interno de servidor" });s
    }
}

module.exports = controller;