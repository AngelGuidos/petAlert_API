const LAnimal = require("../models/lostAnimals.model");
const debug = require("debug")("app:lostAnimals:controller");

const controller = {};

controller.create = async (req, res) => {
    try {
        const { foto, descripcion, zona, nombre_a } = req.body;
        const { correo, _id } = req.user;
        
        debug(`LAnimal creado por ${correo}`);

        //validacion
        const lostAnimal = new LAnimal({
            foto: foto,
            descripcion: descripcion,
            zona: zona,
            id_usuarioLA: _id,
            nombre_a: nombre_a
        });
    
        const newLostAnimal = await lostAnimal.save();
    
        if(!newLostAnimal){
            return res.status(409).json({ error: "Error al crear el Lost animal" });
        }
    
        return res.status(201).json(newLostAnimal);
        
    } catch (error) {
        debug({error})
        return res.status(500).json({ error: "Error interno de servidor" });
    }
};

controller.findAll = async (req, res) => {
    try {
        
        const lostAnimals = await LAnimal
        .find({ hidden: false })
        .populate("id_usuarioLA", "nombre correo");

        return res.status(200).json({ lostAnimals });

    } catch (error) {
        debug({error})
        return res.status(500).json({ error: "Error interno de servidor" });
    }
};

controller.findOneByUserId = async (req, res) => {
    try {
        const { _id: userId } = req.user;

        const lostAnimal = await LAnimal.find({id_usuarioLA: userId, hidden: false})

        if(!lostAnimal){
            return res.status(404).json({ error: "Lost animal no encontrado" })
        }
        return res.status(200).json(lostAnimal)
    } catch (error) {
        debug({error})
        return res.status(500).json({ error: "Error interno de servidor" });s
    }
};

controller.toggleVisibility = async (req, res) =>{
    try {
        const { identifier: solId } = req.params;

        const lA = await LAnimal.findOne({ _id: solId });

        if(!lA){
            return res.status(404).json({ error: "No encontrado" });
        }

        lA.hidden = !lA.hidden;

        await lA.save();

        return res.status(200).json({ message: "Actualizado" });
    } catch (error) {
        debug({error})
        return res.status(500).json({ error: "Error interno de servidor" });
    }
};

module.exports = controller;