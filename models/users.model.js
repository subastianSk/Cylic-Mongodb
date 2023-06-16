const mongoosePaginate = require('mongoose-paginate-v2');
const {
    v4: uuidv4
} = require('uuid');

module.exports = mongoose => {
    const User = mongoose.model(
        "User",
        mongoose.Schema({
            _id: {
                type: String,
                default: uuidv4
            },
            name: String,
            username: String,
            email: String,
            password: String,
            tgl_lahir: Date,
            jenis_nomor_induk: {
                type: String,
                enum: ['NISN', 'NIP'],
                default: 'NISN'
            },
            nomor_induk: String
        }, {
            timestamps: true
        }).plugin(mongoosePaginate)
    );

    return User;
};
