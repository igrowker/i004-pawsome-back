const User = require('../models/userModel');

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        if (user.password !== password) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        res.status(200).json({ message: 'Inicio de sesión exitoso', user });
    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión', error });
    }
};
