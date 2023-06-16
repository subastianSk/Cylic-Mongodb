var express = require('express');
var router = express.Router();
var {
    createNotification,
    getNotificationById
} = require("./../../controllers/Notifications/notifications.controllers");

/* CREATE NOTIFICATION. */
router.post('/create', createNotification);

/* GET NOTIFICATION BY ID. */
router.get('/:id', getNotificationById);

module.exports = router;
