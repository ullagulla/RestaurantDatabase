const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    date: {
        type: String,
        require: true,
    },
    time: {
        type: String,
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

const Booking = mongoose.model('Booking', BookingSchema);

module.exports = Booking;