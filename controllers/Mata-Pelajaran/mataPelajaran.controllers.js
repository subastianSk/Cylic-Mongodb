const db = require("../../models");
const MataPelajaran = db.MataPelajaran;
const User = db.users;

exports.createMataPelajaran = async (req, res) => {
    try {
        // Validate request body
        if (!req.body.Nama_Matpel || !req.body.Jam_Matpel || !req.body.Jenkls_ID || !req.body.User_ID) {
            return res.status(400).send({
                message: "Nama_Matpel, Jam_Matpel, Jenkls_ID, and User_ID are required fields."
            });
        }

        // Check if the user exists
        const user = await User.findById(req.body.User_ID);
        if (!user) {
            return res.status(404).send({
                message: "User not found."
            });
        }

        // Parse the Jam_Matpel string into a Date object
        const jamMatpel = new Date(req.body.Jam_Matpel);

        // Create the MataPelajaran
        const mataPelajaran = new MataPelajaran({
            Nama_Matpel: req.body.Nama_Matpel,
            Jam_Matpel: jamMatpel,
            Jenkls_ID: req.body.Jenkls_ID,
            User_ID: req.body.User_ID
        });

        // Save the MataPelajaran in the database
        const createdMataPelajaran = await mataPelajaran.save();

        // Format the Jam_Matpel field
        const formattedJamMatpel = jamMatpel.toLocaleString("en-US", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            timeZone: "UTC"
        });

        // Create the response object with the formatted Jam_Matpel field
        const response = {
            Nama_Matpel: createdMataPelajaran.Nama_Matpel,
            Jam_Matpel: formattedJamMatpel,
            Jenkls_ID: createdMataPelajaran.Jenkls_ID,
            User_ID: createdMataPelajaran.User_ID,
            _id: createdMataPelajaran._id,
            Matpel_ID: createdMataPelajaran.Matpel_ID,
            createdAt: createdMataPelajaran.createdAt,
            updatedAt: createdMataPelajaran.updatedAt,
            __v: createdMataPelajaran.__v
        };

        res.status(201).send({
            message: "MataPelajaran created successfully!",
            mataPelajaran: response
        });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while creating the MataPelajaran."
        });
    }
};



exports.getMataPelajaranById = async (req, res) => {
    try {
        const mataPelajaran = await MataPelajaran.findById(req.params.id);

        if (!mataPelajaran) {
            return res.status(404).send({
                message: "MataPelajaran not found."
            });
        }

        const user = await User.findById(mataPelajaran.User_ID);

        if (!user) {
            return res.status(404).send({
                message: "User not found."
            });
        }

        res.status(200).send({
            message: "Get MataPelajaran",
            mataPelajaran: {
                ...mataPelajaran.toObject(),
                userName: user.name
            }
        });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while getting the MataPelajaran."
        });
    }
};
