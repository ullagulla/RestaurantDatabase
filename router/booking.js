const express = require('express')
const router = express.Router();
const Booking = require('../models/booking');
const Guest = require('../models/guest');

router.post("/", async (req, res) => {

    const booking = new Booking({
        id: req.body.id,
        date: req.body.date,
        time: req.body.time,
        amountOfGuests: req.body.amountOfGuests,
        customerId: req.body.customerId,
        bookingActive: req.body.bookingActive,
        bookingFinished: req.body.bookingFinished,

    })

    const guests = new Guest({
        customerId: req.body.customerId,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
    })

    // console.log("bokningen", booking, "gästen", guests, "DET FUNKAR WIIE")

    await guests.save((error, success) => {
            if (error) {
                res.send(error.message)
            }
        }),

        await booking.save((error, success) => {
            if (error) {
                res.send(error.message)
            }
        })
        console.log(req.body.customerId)
})

router.get("/", async (req, res) => {
    const bookings = await Booking.find()
    res.send(bookings)

})

router.get("/api/v1/guests", async (req, res) => {
    const guest = await Guest.find()
    res.send(guest)
})

module.exports = router;