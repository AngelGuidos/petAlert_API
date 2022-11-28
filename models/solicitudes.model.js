const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const solicitudSchema = new Schema({

    org: {
        type: Schema.Types.ObjectId,
        ref: "Organization",
        required: true
    },
    razon: {
        type: String,
        trim: true,
        require: true
    },
    nombre: {
        type: String,
        trim: true,
        required: true
    },
    apellido: {
        type: String,
        trim: true,
        required: true
    },
    telefono: {
        type: Number,
        trim: true,
        required: true
    },
    id_usuarioSolic: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    hidden: {
        type: Boolean,
        default: false
    }
        
}, {});

module.exports = Mongoose.model("solicitud", solicitudSchema);