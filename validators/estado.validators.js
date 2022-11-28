const { body, param } = require("express-validator");
const validators = {};

validators.createEstadoValidator = [
    body("identifier")
        .notEmpty().withMessage("Es un campo obligatorio xd")
        .isInt({ min: 1, max: 4 }),
    body("estado")
        .notEmpty().withMessage("Es un campo obligatorio xd")
        .isLength({ max: 20 }).withMessage("20 caracteres maximo")
];

validators.findOneByIdentifier = [
    param("identifier")
        .notEmpty().withMessage("El id no debe estar vacio")
        .isInt({ min: 1, max: 4 })
];

module.exports = validators;