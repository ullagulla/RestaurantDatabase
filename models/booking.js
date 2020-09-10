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
    }
});

const Booking = mongoose.model('Booking', BookingSchema);

module.exports = Booking;