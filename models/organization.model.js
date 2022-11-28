const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;
const debug = require("debug")("app:org-model");


const crypto = require("crypto");

const organizationSchema = new Schema({

    nombre: {
        type: String,
        trim: true,
        required: true
    },
    correo: {
        type: String,
        trim: true,
        required: true
    },
    hashedcontrasena: {
        type: String,
        trim: true,
        required: true
    },
    telefono: {
        type: Number,
        trim: true,
        required: true
    },
    direccion: {
        type: String,
        trim: true,
        require: true
    },
    hidden: {
        type: Boolean,
        default: false
    },
    salt: {
        type: String
    },
    tokens: {
        type: [String],
        default: []
    }

}, {});

organizationSchema.methods = {
    encryptPassword: function (contrasena) {
        if(!contrasena) return "";
        try {
            const encryptedPassword = crypto.pbkdf2Sync(
                contrasena,
                this.salt,
                1000, 64, 
                `sha512`
            ).toString("hex");

            return encryptedPassword;
        } catch (error) {
            debug({error});
            return "";
        }
    },
    makeSalt: function() {
        return crypto.randomBytes(16).toString("hex");
    },
    comparePassword: function(contrasena){
        return this.hashedcontrasena === this.encryptPassword(contrasena);
    }
};

organizationSchema.virtual("contrasena")
    .set(function (contrasena = crypto.randomBytes(16).toString()){
        if (!contrasena) return;

        this.salt = this.makeSalt();
        this.hashedcontrasena = this.encryptPassword(contrasena);
    })

module.exports = Mongoose.model("Organization", organizationSchema)