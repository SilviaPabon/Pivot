//helper para generar una contraseña por medio de la librería bcrypt, con un hash
const helpers = {};
const bcrypt = require('bcryptjs');

helpers.cifrarContraseña = async (contraseña) => {
    const salt = await bcrypt.genSalt(5);
    const hash = await bcrypt.hash(contraseña, salt); 
    return hash;
};

helpers.matchContraseña = async (contraseña, keepContraseña) => {
    try {
        return await bcrypt.compare(contraseña, keepContraseña); //revisa la guardada y la que se da
    } catch (e){
        console.error(e);
    }
};

module.exports = helpers;