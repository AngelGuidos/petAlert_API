const Solicitud = require("../models/solicitudes.model");
const debug = require("debug")("app:solicitud:controller");

const controller = {};

controller.create = async (req, res) => {
    try {
        const { org, razon, nombre, apellido, telefono} = req.body;
        const { correo, _id } = req.user;

        debug(`FAnimal creado por ${correo}`);
        //validacion
        const solicitud = new Solicitud({
            org: org,
            razon: razon,
            nombre: nombre,
            apellido: apellido,
            telefono: telefono,
            id_usuarioSolic: _id
        });
    
        const newSolicitud = await solicitud.save();
    
        if(!newSolicitud){
            return res.status(409).json({ error: "Error al crear la solicitud" });
        }
    
        return res.status(201).json(newSolicitud);
        
    } catch (error) {
        debug({error})
        return res.status(500).json({ error: "Error interno de servidor" });
    }
};


controller.findAll = async (req, res) => {
    try {
        
        const solicitud = await Solicitud
            .find({ hidden: false })
            .populate( "org", "nombre correo" )
            .populate("id_usuarioSolic", "nombre correo");

        return res.status(200).json({ solicitud });

    } catch (error) {
        debug({error})
        return res.status(500).json({ error: "Error interno de servidor" });
    }
};

controller.findOneByUserId = async (req, res) => {
    try {
        const { _id: userId } = req.user;

        const solicitud = await Solicitud
            .find({id_usuarioSolic: userId , hidden: false});

        if(!solicitud){
            return res.status(404).json({ error: "Solicitudes no encontrada no encontrado" })
        }
        return res.status(200).json(solicitud);
    } catch (error) {
        debug({error})
        return res.status(500).json({ error: "Error interno de servidor" });
    }
};

controller.toggleVisibility = async (req, res) =>{
    try {
        const { identifier: solId } = req.params;

        const sol = await Solicitud.findOne({ _id: solId });

        if(!sol){
            return res.status(404).json({ error: "No encontrado" });
        }

        sol.hidden = !sol.hidden;

        await sol.save();

        return res.status(200).json({ message: "Actualizado" });
    } catch (error) {
        debug({error})
        return res.status(500).json({ error: "Error interno de servidor" });
    }
};

module.exports = controller;