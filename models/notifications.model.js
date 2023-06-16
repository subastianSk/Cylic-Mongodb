module.exports = mongoose => {
    const Notification = mongoose.model(
        "Notification",
        mongoose.Schema({
            message: String,
            tgl_notif: {
                type: Date,
                default: Date.now
            },
            tipe_notif: Number,
            user_id: String
        }, {
            timestamps: true
        })
    );

    return Notification;
};
