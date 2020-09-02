const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Guest',
    },
    bookingId: {
        type:String,
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