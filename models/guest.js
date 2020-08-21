const mongoose = require("mongoose");

const GuestSchema = new mongoose.Schema({
    customerId: {
        type: Number,
        require: true,
    },
    name: {
        type: String,
        require: true,
    },
    emailAddress: {
        type: String,
        require: true,
    },
    phoneNumber: {
        type: Number,
        require: true,
    }
})

module.exports = mongoose.model('Guest', GuestSchema);