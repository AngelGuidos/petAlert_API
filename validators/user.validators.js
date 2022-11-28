const { body, param } = require("express-validator");
const validators = {};

validators.createUserValidator = [
    body("nombre")
        .notEmpty().withMessage("Es un campo obligatorio xd"),
    body("apellido")
        .notEmpty().withMessage("Es un campo obligatorio"),
    body("correo")
        .notEmpty().withMessage("Es un campo obligatorio")
        .isEmail().withMessage("debe ser un correo valido"),
    body("contrasena")
        .notEmpty().withMessage("Es un campo obligatorio")
        .isLength({ min: 8 }).withMessage("8 caracteres minimo"),
    body("telefono")
        .notEmpty().withMessage("Es un campo obligatorio"),
    body("sexo")
        .notEmpty().withMessage("Es un campo obligatorio")
        .isBoolean(),
    body("birthdate")
        .notEmpty().withMessage("Es un campo obligatorio")
        .isISO8601('yyyy-mm-dd')
];

validators.findUserByIdValidator = [
    param("identifier")
        .notEmpty().withMessage("El id no debe estar vacio")
        .isMongoId().withMessage("El id debe ser de mongo")
];

module.exports = validators;