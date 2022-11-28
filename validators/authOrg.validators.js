const { body } = require("express-validator");

const validators = {};
const passwordRegexp = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/;

validators.registerOrgValidators = [
    body("nombre")
        .notEmpty().withMessage("Es un campo obligatorio xd")
        .isLength({ min: 4, max:32 }),
        body("correo")
        .notEmpty().withMessage("Es un campo obligatorio")
        .isEmail().withMessage("debe ser un correo valido"),
    body("contrasena")
        .notEmpty().withMessage("Es un campo obligatorio")
        .matches(passwordRegexp).withMessage("Entre 8 y 32 caracteres, al menos 1 M y 1 m y un Num"),
    body("telefono")
        .notEmpty().withMessage("Es un campo obligatorio")
        .isInt({ min: 8 }),
    body("direccion")
        .notEmpty().withMessage("Es un campo obligatorio")
];  

module.exports = validators;