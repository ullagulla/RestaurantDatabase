const express = require('express')
const router = express.Router();
const Booking = require('../models/booking');
const Guest = require('../models/guest');

router.post("/", async (req, res) => {

    const guest = await Guest.findOne({email: req.body.email})

    if(!guest) {

        new Guest({
            // customerId: req.body.customerId,
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
        }).save()
        .then(async () => {
            const newGuest = await Guest.findOne({email: req.body.email})

            new Booking({
                id: req.body.id,
                date: req.body.date,
                time: req.body.time,
                amountOfGuests: req.body.amountOfGuests,
                customerId: newGuest._id,
                bookingActive: req.body.bookingActive,
                bookingFinished: req.body.bookingFinished,
        
            }).save()
        })
    } 
    else {
        new Booking({
            id: req.body.id,
            date: req.body.date,
            time: req.body.time,
            amountOfGuests: req.body.amountOfGuests,
            customerId: guest._id,
            bookingActive: req.body.bookingActive,
            bookingFinished: req.body.bookingFinished,
        }).save()
    }
    // console.log("bokningen", booking, "gästen", guests, "DET FUNKAR WIIE")
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