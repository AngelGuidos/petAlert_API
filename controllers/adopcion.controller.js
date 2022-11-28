const Adoption = require("../models/adopcion.model.js");
const debug = require("debug")("app:adopcion:controller");

const controller = {};

controller.create = async (req, res) => {
    try {
        const { foto, descripcion, nombre_a } = req.body;
        const { correo, _id } = req.user;

        debug(`Adopcion creado por ${correo}`);
        //validacion
        const adoption = new Adoption({
            foto: foto,
            descripcion: descripcion,
            id_usuarioAdop: _id,
            nombre_a: nombre_a
        });
    
        const newAdoption = await adoption.save();
    
        if(!newAdoption){
            return res.status(409).json({ error: "Error al crear la adopcion" });
        }
    
        return res.status(201).json(newAdoption);
        
    } catch (error) {
        debug({error})
        return res.status(500).json({ error: "Error interno de servidor" });
    }
};


controller.findAll = async (req, res) => {
    try {
        
        const adoption = await Adoption
            .find({ hidden: false })
            .populate("id_usuarioAdop", "nombre correo");

        return res.status(200).json({ adoption });

    } catch (error) {
        debug({error})
        return res.status(500).json({ error: "Error interno de servidor" });
    }
};


controller.findOneByUserId = async (req, res) => {
    try {
        const { _id: userId } = req.user;

        const adoption = await Adoption.find({id_usuarioAdop: userId, hidden: false})

        if(!adoption){
            return res.status(404).json({ error: "Adoption no encontrado" })
        }
        return res.status(200).json(adoption);
    } catch (error) {
        debug({error})
        return res.status(500).json({ error: "Error interno de servidor" });
    }
};

controller.toggleVisibility = async (req, res) =>{
    try {
        const { identifier: solId } = req.params;

        const adop = await Adoption.findOne({ _id: solId });

        if(!adop){
            return res.status(404).json({ error: "No encontrado" });
        }

        adop.hidden = !adop.hidden;

        await adop.save();

        return res.status(200).json({ message: "Actualizado" });
    } catch (error) {
        debug({error})
        return res.status(500).json({ error: "Error interno de servidor" });
    }
};

module.exports = controller;