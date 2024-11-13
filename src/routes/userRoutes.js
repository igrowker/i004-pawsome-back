const express = require('express');
const { loginUser } = require('../controllers/userController');
const router = express.Router();

router.post('/login', loginUser); // Ruta de login

module.exports = router;
