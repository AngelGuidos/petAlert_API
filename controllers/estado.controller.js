const Estado = require("../models/estado.model");
const debug = require("debug")("app:estado:controller");

const controller = {};

controller.create = async (req, res) => {
    try {
        const { identifier, estado } = req.body;
    
        //validacion
        const estadoAux = new Estado({
            identifier: identifier,
            estado: estado
        });
    
        const newEstado = await estadoAux.save();
    
        if(!newEstado){
            return res.status(409).json({ error: "Error al crear el estado" });
        }
    
        return res.status(201).json(newEstado);
        
    } catch (error) {
        debug({error})
        return res.status(500).json({ error: "Error interno de servidor" });
    }
};


controller.findAll = async (req, res) => {
    try {
        
        const estado = await Estado.find({ hidden: false });

        return res.status(200).json({ estado });

    } catch (error) {
        debug({error})
        return res.status(500).json({ error: "Error interno de servidor" });
    }
};


controller.findOneByIdentifier = async (req, res) => {
    try {
        const { identifier } = req.params;

        const estado = await FAnimal.find({identifier: identifier})

        if(!fAnimal){
            return res.status(404).json({ error: "Found animal no encontrado" })
        }
        return res.status(200).json(estado)
    } catch (error) {
        debug({error})
        return res.status(500).json({ error: "Error interno de servidor" });s
    }
};

module.exports = controller;