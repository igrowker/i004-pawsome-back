const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/\S+@\S+\.\S+/, 'Email inválido']
    }
});

const Usuario = mongoose.model('Usuario', userSchema);

module.exports = Usuario;

/* 
    NOTA: Si se necesitan más campos en el futuro, se pueden agregar
    aquí. Ejemplo:
    
    edad: {
        type: Number,
        min: 0
    },
    altura: {
        type: Number
    }
*/
