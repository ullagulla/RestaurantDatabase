const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        require: true,
    },
    time: {
        type: Number,
        require: true,
    },
    amountOfGuests: {
        type: Number,
        require: true,
    },
    customerId: {
        type: Number,
        require: true,
    },
    bookingActive: {
        type: Boolean,
        default: true,
        require: true,
    },
    bookingFinished: {
        type: Boolean,
        default: false,
        require: true,
    }
})

module.exports = mongoose.model('Booking', BookingSchema);