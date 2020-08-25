const express = require('express')
const router = express.Router();
const Booking = require('../models/booking')

router.post("/", async (req, res) => {

    // const booking = new Booking({
        // date: req.body.date,
        // time: req.body.time,
        // amountOfGuests: req.body.amountOfGuests,
        // customerId: req.body.customerId,
        // bookingActive: req.body.bookingActive,
        // bookingFinished: req.body.bookingFinished
    // })

    console.log(booking)

    await booking.save((error, success) => {
        if (error) {
            res.send(error.message)
        }
    })


})

router.get("/", async (req, res) => {
    const bookings = await Booking.find()
    console.log(bookings + "hej")

    res.send(bookings)
})

module.exports = router;