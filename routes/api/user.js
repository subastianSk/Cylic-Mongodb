const express = require('express');
const router = express.Router();
const {
    register,
    login
} = require('../../controllers/user/user.controllers');
const authMiddleware = require('../../middleware/auth.middleware');

/* REGISTER USER */
router.post('/register', register);

/* LOGIN USER */
router.post('/login', login);


module.exports = router;
