var express = require('express');
var router = express.Router();
var API_ROLES = require('./role');
var API_USERS = require('./user');
var API_NOTIF = require('./notifications');
var API_mataPelajaran = require('./mataPelajaran');

router.use('/v1',
    router.get('', (req, res) => {
        res.send({
            message: 'Welcome to SISTEM SEKOLAH API',
            version: 'v1.0.0'
        });
    })
);


router.use('/v1/', API_ROLES);
router.use('/v1/', API_USERS);
router.use('/v1/', API_NOTIF);
router.use('/v1/mataPelajaran', API_mataPelajaran);

module.exports = router;