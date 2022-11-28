const { body, param } = require("express-validator");
const validators = {};

validators.createfAnimalValidator = [

    body("foto")
        .notEmpty().withMessage("Es un campo obligatorio")
        .isURL().withMessage("Debe ser la url a un archivo"),
    body("descripcion")
        .isLength({ max: 240 }).withMessage("240 caracteres maximo"),
    body("id_estado")
        .notEmpty().withMessage("Es un campo obligatorio")
        .isInt({ min: 1, max: 4 }),
    body("ubicacion")
        .notEmpty().withMessage("Es un campo obligatorio"),
    /*body("id_usuarioFA")
        .notEmpty().withMessage("Es un campo obligatorio")
        .isMongoId().withMessage("Debe ser un id tipo mongo")*/

];

validators.findFoundAnimalByUserIdValidator = [
    param("identifier")
        .notEmpty().withMessage("El id no debe estar vacio")
        .isMongoId().withMessage("El id debe ser de mongo")
];

module.exports = validators;