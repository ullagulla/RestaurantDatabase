const express = require('express')
const router = express.Router();
const Booking = require('../models/booking');
const Guest = require('../models/guest');

router.post("/", async (req, res) => {
    console.log("hej " + req.body)
    await new Booking({
        date: req.body.date,
        time: req.body.time,
        amountOfGuests: req.body.amountOfGuests,
        // customerId: req.body._id,
        bookingActive: req.body.bookingActive,
        bookingFinished: req.body.bookingFinished
    }).save()
    res.send("Det funkade wiee")
})

router.get("/", async (req, res) => {
    const bookings = await Booking.find() 
    res.send(bookings)
})

module.exports = router;