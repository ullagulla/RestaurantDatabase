const mongoose = require("mongoose");

const GuestSchema = new mongoose.Schema({
    numberOfGuests: {
        type: Number,
        require: true,
    },
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    phone: {
        type: Number,
        require: true,
    }
})

module.exports = mongoose.model('Guest', GuestSchema);