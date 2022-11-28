const { verifyToken } = require("../utils/jwt.tools");

const middlewares = {};

const tokenPrefix = "Bearer";

const User = require("../models/user.model");
const Org = require("../models/organization.model");

middlewares.authentication = async(req, res, next) =>{
    try {
        
        //paso 01 verificar que authorization exista
        const { authorization } = req.headers; 
        if (!authorization){
            return res.status(401).json({ error: "No autorizado" });
        }
        //paso 2 token valido
        const [prefix, token] = authorization.split(" ");

        if (prefix !== tokenPrefix){
            return res.status(401).json({ error: "No autorizado" });    
        };
        if (!token){
            return res.status(401).json({ error: "No autorizado" }); 
        };
        const tokenObject = verifyToken(token);
        
        if(!tokenObject){
            return res.status(401).json({ error: "No autorizado" }); 
        };
        
        const { userId } = tokenObject;
        //obtener al usuario
        const user = await User.findById(userId);

        if(!user){
            return res.status(401).json({ error: "No autorizado" }); 
        };
        //token registrado
        const isTokenValid = user.tokens.includes(token);
        if(!isTokenValid){
            return res.status(401).json({ error: "No autorizado" }); 
        };
        //moificar la peticion para tener info user
        req.user = user;
        req.token = token;

        //pasar al siguiente
        next();

    } catch (error) {
        return res.status(500).json({ error: "Error inesperado del server" });
    }
};

middlewares.authenticationOrg = async(req, res, next) =>{
    try {
        
        //paso 01 verificar que authorization exista
        const { authorization } = req.headers; 
        if (!authorization){
            return res.status(401).json({ error: "No autorizado1" });
        }
        //paso 2 token valido
        const [prefix, token] = authorization.split(" ");

        if (prefix !== tokenPrefix){
            return res.status(401).json({ error: "No autorizado2" });    
        };
        if (!token){
            return res.status(401).json({ error: "No autorizado3" }); 
        };
        const tokenObject = verifyToken(token);
        
        if(!tokenObject){
            return res.status(401).json({ error: "No autorizado4" }); 
        };
        
        const { userId } = tokenObject;
        //obtener al usuario
        const org = await Org.findById(userId);

        if(!org){
            return res.status(401).json({ error: "No autorizado5" }); 
        };
        //token registrado
        const isTokenValid = org.tokens.includes(token);
        if(!isTokenValid){
            return res.status(401).json({ error: "No autorizado6" }); 
        };
        //moificar la peticion para tener info user
        req.user = org;
        req.token = token;

        //pasar al siguiente
        next();

    } catch (error) {
        return res.status(500).json({ error: "Error inesperado del server" });
    }
};

module.exports = middlewares;