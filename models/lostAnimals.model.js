const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const lAnimalSchema = new Schema({

    foto: {
        type: String,
        require: true
    },
    descripcion: {
        type: String,
        trim: true,
        require: true
    },
    zona: {
        type: String,
        trim: true,
        require: true
    },
    id_usuarioLA: {
        type: Schema.Types.ObjectId,
        ref: "User",
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

}, { timestamps: true });

module.exports = Mongoose.model("lostAnimals", lAnimalSchema);