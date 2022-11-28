const { body, param } = require("express-validator");
const validators = {};

validators.createAdoption = [

    body("foto")
        .notEmpty().withMessage("Es un campo obligatorio")
        .isURL().withMessage("Debe ser la url a un archivo"),
    body("descripcion")
        .isLength({ max: 240 }).withMessage("240 caracteres maximo")
        .notEmpty().withMessage("Es un campo obligatoria"),
    /*body("id_usuarioAdop")
        .notEmpty().withMessage("Es un campo obligatorio")
        .isMongoId().withMessage("Debe ser un id tipo mongo"),*/
    body("nombre_a")
        .notEmpty().withMessage("Es un campo obligatorio")

];

validators.findAdoptionByUserIdValidator = [

    param("identifier")
        .notEmpty().withMessage("El id no debe estar vacio")
        .isMongoId().withMessage("El id debe ser de mongo")

];

module.exports = validators;