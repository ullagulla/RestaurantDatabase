const express = require('express')
const router = express.Router();
const Booking = require('../models/booking')

router.post("/", async (req, res) => {

    const booking = new Booking({
        id: 1,
        date: "2020-08-23",
        time: '18.00',
        amountOfGuests: 6,
        customerId: 2,
        bookingActive: false,
        bookingFinished: false,
    })

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