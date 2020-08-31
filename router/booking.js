const express = require('express')
const router = express.Router();
const Booking = require('../models/booking');
const Guest = require('../models/guest');

router.post("/booking", async (req, res) => {

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
    console.log(bookings)
})

router.get("/api/v1/guests", async (req, res) => {
    const guest = await Guest.find()
    res.send(guest)
    console.log(guest)
})

router.get("/admin/:id", async (req, res) => {
    const oneBooking = await Booking.findOne({
        _id: req.params.id
    })
    console.log("hej " + oneBooking)
    res.send(oneBooking)
})

// router.delete("/admin/delete/:id", async (req, res) => {

//     const booking = await Booking.findByIdAndDelete({
//         _id: req.body.bookings._id
//     })

//     res.send("Det funkade" + booking);

// })

module.exports = router;