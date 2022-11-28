const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;
const debug = require("debug")("app:user-model");

const crypto = require("crypto");

const UserSchema = new Schema({
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
    correo: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    hashedcontrasena: {
        type: String,
        required: true
    },
    telefono: {
        type: Number,
        trim: true,
        required: true
    },
    sexo: {
        type: Boolean,
        trim: true,
        required: true
    },
    birthdate:{
        type: Date,
        trim: true,
        required: true
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

UserSchema.methods = {
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

UserSchema.virtual("contrasena")
    .set(function (contrasena = crypto.randomBytes(16).toString()){
        if (!contrasena) return;

        this.salt = this.makeSalt();
        this.hashedcontrasena = this.encryptPassword(contrasena);
    })

module.exports = Mongoose.model("User", UserSchema);