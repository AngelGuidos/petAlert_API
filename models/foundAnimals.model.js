const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const fAnimalSchema = new Schema({

    foto: {
        type: String,
        require: true
    },
    descripcion: {
        type: String,
        trim: true,
        require: false
    },
    id_estado: {
        type: String,
        trim: true,
        require: true,
        default: " "
    },
    ubicacion: {
        type: String,
        trim: true,
        require: true
    },
    atendido: {
        type: Boolean,
        default: false
    },
    id_usuarioFA: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    hidden: {
        type: Boolean,
        default: false
    }


}, { timestamps: true});

module.exports = Mongoose.model("foundAnimals", fAnimalSchema);