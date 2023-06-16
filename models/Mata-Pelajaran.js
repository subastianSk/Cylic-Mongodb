const mongoosePaginate = require('mongoose-paginate-v2');
const {
    v4: uuidv4
} = require('uuid');

module.exports = mongoose => {
    const MataPelajaran = mongoose.model(
        'MataPelajaran',
        mongoose.Schema({
            Matpel_ID: {
                type: String,
                default: uuidv4,
            },
            Nama_Matpel: String,
            Jam_Matpel: Date, // Updated to Date type
            Jenkls_ID: String,
            User_ID: String,
        }, {
            timestamps: true,
        }).plugin(mongoosePaginate)
    );

    return MataPelajaran;
};
