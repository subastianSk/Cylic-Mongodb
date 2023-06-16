const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.config.url;

// V1
db.roles = require("./roles.model.js")(mongoose);
db.users = require("./users.model.js")(mongoose);
db.notification = require("./notifications.model.js")(mongoose);
db.MataPelajaran = require("./Mata-Pelajaran.js")(mongoose);

module.exports = db;
