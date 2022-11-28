const { body, param } = require("express-validator");
const validators = {};

validators.createLostAnimalValidator = [

    body("foto")
        .notEmpty().withMessage("Es un campo obligatorio")
        .isURL().withMessage("Debe ser la url a un archivo"),
    body("descripcion")
        .notEmpty().withMessage("Es un campo obligatorio")
        .isLength({ max: 240 }).withMessage("240 caracteres maximo"),
    body("zona")
        .notEmpty().withMessage("Es un campo obligatorio"),
    /*body("id_usuarioLA")
        .notEmpty().withMessage("Es un campo obligatorio")
        .isMongoId().withMessage("Debe ser un id tipo mongo"),*/
    body("nombre_a")
        .notEmpty().withMessage("Es un campo obligatorio")
    
];

validators.findLostAnimalByUserIdValidator = [
    param("identifier")
        .notEmpty().withMessage("El id no debe estar vacio")
        .isMongoId().withMessage("El id debe ser de mongo")
];


module.exports = validators;