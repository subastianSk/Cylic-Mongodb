const db = require("../../models");
const User = db.users;
const Notification = db.notification;
const {
    v4: uuidv4,
    validate: isUUID
} = require('uuid');

exports.createNotification = async (req, res) => {
    try {
        // Validate request body
        if (!req.body.message || !req.body.tgl_notif || !req.body.tipe_notif || !req.body.user_id) {
            return res.status(400).send({
                message: "Message, notification date, notification type, and user ID are required fields."
            });
        }

        // Check if the user exists
        const user = await User.findById(req.body.user_id);
        if (!user) {
            return res.status(404).send({
                message: "User not found."
            });
        }

        // Create the notification
        const notification = new Notification({
            ...req.body
        });

        // Save the notification in the database
        const createdNotification = await notification.save();

        res.status(201).send({
            message: "Notification created successfully!",
            notification: createdNotification
        });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while creating the notification."
        });
    }
};

exports.getNotificationById = async (req, res) => {
    try {
        const isValidUUID = isUUID(req.params.id);
        if (!isValidUUID) {
            return res.status(400).send({
                message: "Invalid notification ID format."
            });
        }

        const notification = await Notification.findOne({
            user_id: req.params.id
        });

        if (!notification) {
            return res.status(404).send({
                message: "Notification not found."
            });
        }

        const user = await User.findById(notification.user_id);

        if (!user) {
            return res.status(404).send({
                message: "User not found."
            });
        }

        res.status(200).send({
            message: "Get Notification",
            notification: {
                ...notification.toObject(),
                name: user.name
            }
        });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while getting the notification."
        });
    }
};

