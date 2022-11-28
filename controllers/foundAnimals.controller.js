const FAnimal = require("../models/foundAnimals.model.js");
const debug = require("debug")("app:foundAnimals:controller");

const controller = {};

controller.create = async (req, res) => {
    try {
        const { foto, descripcion, id_estado, ubicacion, atendido } = req.body;
        const { correo, _id } = req.user;

        debug(`FAnimal creado por ${correo}`);
        //validacion
        const fAnimal = new FAnimal({
            foto: foto,
            descripcion: descripcion,
            id_estado: id_estado,
            ubicacion: ubicacion,
            atendido: atendido,
            id_usuarioFA: _id
        });
    
        const newFoundAnimal = await fAnimal.save();
    
        if(!newFoundAnimal){
            return res.status(409).json({ error: "Error al crear el Found animal" });
        }
    
        return res.status(201).json(newFoundAnimal);
        
    } catch (error) {
        debug({error})
        return res.status(500).json({ error: "Error interno de servidor" });
    }
};

controller.findAll = async (req, res) => {
    try {
        
        const foundAnimals = await FAnimal
            .find({ hidden: false })
            .populate("id_usuarioFA", "nombre correo");

        return res.status(200).json({ foundAnimals });

    } catch (error) {
        debug({error})
        return res.status(500).json({ error: "Error interno de servidor" });
    }
};

controller.findOneByUserId = async (req, res) => {
    try {
        const { _id: userId } = req.user;

        const fAnimal = await FAnimal.find({id_usuarioFA: userId, hidden: false})

        if(!fAnimal){
            return res.status(404).json({ error: "Found animal no encontrado" })
        }
        return res.status(200).json(fAnimal)
    } catch (error) {
        debug({error})
        return res.status(500).json({ error: "Error interno de servidor" });s
    }
};

controller.toggleVisibility = async (req, res) =>{
    try {
        const { identifier: solId } = req.params;

        const fA = await FAnimal.findOne({ _id: solId });

        if(!fA){
            return res.status(404).json({ error: "No encontrado" });
        }

        fA.hidden = !fA.hidden;

        await fA.save();

        return res.status(200).json({ message: "Actualizado" });
    } catch (error) {
        debug({error})
        return res.status(500).json({ error: "Error interno de servidor" });
    }
};

module.exports = controller;