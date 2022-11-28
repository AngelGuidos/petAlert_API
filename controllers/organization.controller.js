const Organization = require("../models/organization.model");
const debug = require("debug")("app:organization:controller");

const controller = {};

controller.create = async (req, res) => {
    
    try {
        const { nombre, correo, contrasena, telefono, direccion } = req.body;
        
        //validacion
        const organization = new Organization({
            nombre: nombre,
            correo: correo,
            contrasena: contrasena,
            telefono: telefono,
            direccion: direccion
        });

        const newOrganization = await organization.save();

        if(!newOrganization){
            return res.status(409).json({ error: "Error al crear organization" });
        }

        return res.status(201).json(newOrganization);

    } catch (error) {
        debug({error})
        return res.status(500).json({ error: "Error interno de servidor" });
    }

};


controller.findAll = async (req, res) => {

    try {
        
        const organization = await Organization.find({ hidden: false });

        return res.status(200).json({ organization });

    } catch (error) {
        debug({error})
        return res.status(500).json({ error: "Error interno de servidor" });
    }

};

controller.findOneById = async (req, res) => {

    try {
        
        const { identifier } = req.params;

        const organization = await Organization.findById(identifier)

        if(!organization){
            return res.status(404).json({ error: "Organization no encontrado" })
        }
        return res.status(200).json(organization)

    } catch (error) {
        debug({error})
        return res.status(500).json({ error: "Error interno de servidor" });
    }

};

module.exports = controller;