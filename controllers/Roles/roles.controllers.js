const db = require("../../models");
const Roles = db.roles;

exports.create = async (req, res) => {
    try {
        // Validate request body
        if (!req.body.name || !req.body.code) {
            res.status(400).send({
                message: "Name and code are required fields."
            });
            return;
        }

        // Check if role with same name or code already exists
        const existingRole = await Roles.findOne({
            $or: [{
                    name: req.body.name
                },
                {
                    code: req.body.code
                }
            ]
        });

        if (existingRole) {
            res.status(409).send({
                message: "Role with same name or code already exists."
            });
            return;
        }

        // Create the role
        const role = new Roles({
            ...req.body
        });

        // Save the role in the database
        const createdRole = await role.save();

        res.status(201).send({
            message: "Role created successfully!",
            role: createdRole
        });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while creating the role."
        });
    }
};

