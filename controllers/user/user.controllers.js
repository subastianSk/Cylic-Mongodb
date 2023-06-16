const db = require("../../models");
const bcrypt = require('bcrypt');
const Users = db.users;
const Roles = db.roles;
const jwt = require('jsonwebtoken');
const config = require('../../config/auth.config');
const {
    decodeToken
} = require("../../helpers/decodeToken");

exports.register = async (req, res) => {
    try {
        // Validate request body
        if (!req.body.name || !req.body.email || !req.body.password || !req.body.role) {
            return res.status(400).send({
                message: "Name, email, password, and role are required fields."
            });
        }

        // Check if the user already exists
        const existingUser = await Users.findOne({
            email: req.body.email
        });
        if (existingUser) {
            return res.status(400).send({
                message: "User with the given email already exists."
            });
        }

        // Find the role based on the provided code
        const role = await Roles.findOne({
            code: req.body.role
        });
        if (!role) {
            return res.status(400).send({
                message: "Invalid role code."
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Create the user
        const user = new Users({
        ...req.body
        });

        // Save the user in the database
        const createdUser = await user.save();

        res.status(201).send({
            message: "User registered successfully!",
            user: createdUser
        });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while registering the user."
        });
    }
};


exports.login = async (req, res) => {
    try {
        // Validate request body
        if (!req.body.email || !req.body.password) {
            return res.status(400).send({
                message: "Email and password are required fields."
            });
        }

        // Check if the user exists
        const user = await db.users.findOne({
            email: req.body.email
        });
        if (!user) {
            return res.status(404).send({
                message: "User not found."
            });
        }

        // Validate the password
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(401).send({
                message: "Invalid email or password."
            });
        }

        // Generate an access token
        const accessToken = jwt.sign({
            id: user._id
        }, config.jwtSecret, {
            expiresIn: config.jwtExpiration
        });

        res.status(200).send({
            accessToken
        });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while logging in."
        });
    }
};
