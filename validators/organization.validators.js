const { body, param } = require("express-validator");
const validators = {};

validators.createOrganizationValidator = [

    body("nombre")
        .notEmpty().withMessage("Es un campo obligatorio xd"),
    body("correo")
        .notEmpty().withMessage("Es un campo obligatorio")
        .isEmail().withMessage("debe ser un correo valido"),
    body("contrasena")
        .notEmpty().withMessage("Es un campo obligatorio")
        .isLength({ min: 8 }).withMessage("8 caracteres minimo"),
    body("telefono")
        .notEmpty().withMessage("Es un campo obligatorio"),
    body("direccion")
        .notEmpty().withMessage("Es un campo obligatorio xd")   

];

validators.findOrganizationByIdValidator = [
    param("identifier")
        .notEmpty().withMessage("El id no debe estar vacio")
        .isMongoId().withMessage("El id debe ser de mongo")
];

module.exports = validators;