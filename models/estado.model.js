const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const estadoSchema = new Schema({

    identifier: {
        type: Number,
        trim: true,
        require: true
    },
    estado: {
        type: String,
        trim: true,
        require: true
    }

});

module.exports = Mongoose.model("estado", estadoSchema);