const { body } = require("express-validator");

const validators = {};
const passwordRegexp = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/;


validators.registerValidators = [
    body("nombre")
        .notEmpty().withMessage("Es un campo obligatorio xd")
        .isLength({ min: 4, max:32 }),
    body("apellido")
        .notEmpty().withMessage("Es un campo obligatorio")
        .isLength({ min: 4, max:32 }),
    body("correo")
        .notEmpty().withMessage("Es un campo obligatorio")
        .isEmail().withMessage("debe ser un correo valido"),
    body("contrasena")
        .notEmpty().withMessage("Es un campo obligatorio")
        .matches(passwordRegexp).withMessage("Entre 8 y 32 caracteres, al menos 1 M y 1 m"),
    body("telefono")
        .notEmpty().withMessage("Es un campo obligatorio")
        .isInt({ min: 8 }),
    body("sexo")
        .notEmpty().withMessage("Es un campo obligatorio")
        .isBoolean(),
    body("birthdate")
        .notEmpty().withMessage("Es un campo obligatorio")
        .isISO8601('yyyy-mm-dd')
];

module.exports = validators;