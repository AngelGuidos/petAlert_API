const { validationResult } = require("express-validator");

module.exports = (req, res, next) => {
    //validar parametros genericos
    const errors = validationResult(req);

    //verif error
    if(!errors.isEmpty()){


        return res.status(400)
            .json({
                errors: errors.array().map(error => ({
                    field: error.param,
                    message: error.msg
                }))
            });
    }

    //Siguiente
    next();
}