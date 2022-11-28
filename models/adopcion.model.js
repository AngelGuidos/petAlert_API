const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const adopcionSchema = new Schema({

    foto: {
        type: String,
        require: true
    },
    descripcion: {
        type: String,
        trim: true,
        require: true
    },
    id_usuarioAdop: {
        type: Schema.Types.ObjectId,
        ref: "Organization",
        required: true
    },
    nombre_a: {
        type: String,
        trim: true,
        require: true
    },
    hidden: {
        type: Boolean,
        default: false
    }

});

module.exports = Mongoose.model("adopcion", adopcionSchema);