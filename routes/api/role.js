var express = require('express');
var router = express.Router();
var {
    create
} = require("./../../controllers/Roles/roles.controllers")


/* CREATE PERMISSION. */
router.post('/role/create', create);

module.exports = router;