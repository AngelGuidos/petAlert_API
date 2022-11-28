const { body, param } = require("express-validator");
const validators = {};

validators.createSolicitud = [

    body("org")
        .notEmpty().withMessage("Es un campo obligatorio")
        .isMongoId().withMessage("Debe ser un id tipo mongo"),
    body("razon")
        .isLength({ max: 240 }).withMessage("240 caracteres maximo")
        .notEmpty().withMessage("Es un campo obligatoria"),
    body("nombre")
        .notEmpty().withMessage("Es un campo obligatorio xd"),
    body("apellido")
        .notEmpty().withMessage("Es un campo obligatorio"),
    body("telefono")
        .notEmpty().withMessage("Es un campo obligatorio")
        .isNumeric().withMessage("Debe ser un numero de telefono valido (solo numeros)"),
    /*body("id_usuarioSolic")
        .notEmpty().withMessage("Es un campo obligatorio")
        .isMongoId().withMessage("Debe ser un id tipo mongo")*/

];


validators.findSolicitudByUserIdValidator = [

    param("identifier")
        .notEmpty().withMessage("El id no debe estar vacio")
        .isMongoId().withMessage("El id debe ser de mongo")

];


module.exports = validators;