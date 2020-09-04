const express = require('express')
const router = express.Router();
const Booking = require('../models/booking');
const Guest = require('../models/guest');
const config = require("../config/config")
const nodemailer = require('nodemailer');

let sendFrom = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.email,
      pass: config.password,
    }
  });

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

            let newBooking = new Booking({
                id: req.body.id,
                date: req.body.date,
                time: req.body.time,
                amountOfGuests: req.body.amountOfGuests,
                customerId: newGuest._id,
                bookingActive: req.body.bookingActive,
                bookingFinished: req.body.bookingFinished,
        
            });
            await newBooking.save();

            // let mailContent = {
            //     from: "booking@purplenurples.se",
            //     to: req.body.email,
            //     subject: "Din bokning hos Purple Nurples.",
            //     text:`
            //     Tack för din bokning ${req.body.name}. 
            //     Varmt välkommen till Purple Nurples den ${req.body.date} för ${req.body.amountOfGuests} personer, klockan ${req.body.time}.
            //     Vid avbokning vänligen ring till restaurangen på 08-666666.`
            //   };

            // sendFrom.sendMail(mailContent, function (error, info) {
            //     if (error) {
            //       console.log(error);
            //     } else {
            //       console.log('Email sent (info.respsonse): ', info.response);
            //     }
              
            //   });

            res.send(newBooking);
        })

    } 
    else {
        let newBooking = new Booking({
            id: req.body.id,
            date: req.body.date,
            time: req.body.time,
            amountOfGuests: req.body.amountOfGuests,
            customerId: guest._id,
            bookingActive: req.body.bookingActive,
            bookingFinished: req.body.bookingFinished,
        });
        await newBooking.save();

        // let mailContent = {
        //     from: "booking@purplenurples.se",
        //     to: req.body.email,
        //     subject: "Din bokning hos Purple Nurples.",
        //     text: `
        //     Tack för din bokning ${req.body.name}. 
        //     Varmt välkommen till Purple Nurples den ${req.body.date} för ${req.body.amountOfGuests} personer, klockan ${req.body.time}.
        //     Vid avbokning vänligen ring till restaurangen på 08-666666.`
        //   };

        // sendFrom.sendMail(mailContent, function (error, info) {
        //     if (error) {
        //       console.log(error);
        //     } else {
        //       console.log('Email sent (info.respsonse): ', info.response);
        //     }
          
        //   });

        res.send(newBooking);
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

router.delete("/admin/delete/:id", async (req, res) => {
    console.log("Får vi data från react?", req.params)
    const bookingInfo = await Booking.findOne({
        _id: req.params.id
    })
    const customer = await Guest.findOne({
        _id: bookingInfo.customerId
    })
    // console.log(email)
    console.log("Det här är kunden " + customer)
    const booking = await Booking.deleteOne({
        _id: req.params.id
    })

    // let mailContent = {
    //     from: "booking@purplenurples.se",
    //     to: customer.email,
    //     subject: "Avbokningsbekräftelse hos Purple Nurples",
    //     text: `
    //     Hej ${customer.name}. 
    //     Din bokning den ${bookingInfo.date} för ${bookingInfo.amountOfGuests} personer, klockan ${bookingInfo.time} har avbokats.
    //     Ring oss på 08-666666 om du har några frågor.`
    //   };

    // sendFrom.sendMail(mailContent, function (error, info) {
    //     if (error) {
    //       console.log(error);
    //     } else {
    //       console.log('Email sent (info.respsonse): ', info.response);
    //     }
      
    //   });

    res.send("Det funkade" + booking);

})

module.exports = router;