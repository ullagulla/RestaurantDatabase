const { getMaxListeners } = require("..");

require("dotenv").config();

const config = {
    databaseURL: process.env.DATABASE,
    email: "purplenurples007@gmail.com",
    password: "Nurples007",
};

module.exports = config;