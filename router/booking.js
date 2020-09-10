const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
const Guest = require('../models/guest');
const config = require("../config/config");
const nodemailer = require('nodemailer');

let sendFrom = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.email,
      pass: config.password,
    }
  });

//Skapar en ny bokning, kollar ifall gästen finns
router.post("/", async (req, res) => {

    const guest = await Guest.findOne({email: req.body.email})

    //Om gästen inte finns, skapa ny gäst och bokning på samma nya gäst
    if(!guest) {

        new Guest({
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

            //Skickar bokningsmejl
            let mailContent = {
                from: "booking@purplenurples.se",
                to: req.body.email,
                subject: "Din bokning hos Purple Nurples.",
                text:`
            Tack för din bokning ${req.body.name}. 
            Varmt välkommen till Purple Nurples den ${req.body.date} för ${req.body.amountOfGuests} personer, klockan ${req.body.time}.
            Vid avbokning vänligen ring till restaurangen på 08-666666.`
              };

            sendFrom.sendMail(mailContent, function (error, info) {
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent (info.respsonse): ', info.response);
                }
              
              });
            res.send(newBooking);
        });

    }
    //Om gästen finns, skapa bokning på den befintliga gästen
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

        //Skickar mejl vid ny bokning
        let mailContent = {
            from: "booking@purplenurples.se",
            to: req.body.email,
            subject: "Din bokning hos Purple Nurples.",
            text: `
            Tack för din bokning ${req.body.name}. 
            Varmt välkommen till Purple Nurples den ${req.body.date} för ${req.body.amountOfGuests} personer, klockan ${req.body.time}.
            Vid avbokning vänligen ring till restaurangen på 08-666666.`
          };

        sendFrom.sendMail(mailContent, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent (info.respsonse): ', info.response);
            }
          
          });

        res.send(newBooking);
    }
});

//Hämtar alla bokningar från databasen
router.get("/", async (req, res) => {
    const bookings = await Booking.find()
    res.send(bookings)
});

//Hämtar alla gäster från databasen
router.get("/guests", async (req, res) => {
    const guest = await Guest.find()
    res.send(guest)
});

//Tar bort en bokning från databasen med hjälp av id från react-urlen
router.delete("/admin/delete/:id", async (req, res) => {
    const bookingInfo = await Booking.findOne({
        _id: req.params.id
    });
    const customer = await Guest.findOne({
        _id: bookingInfo.customerId
    });
    const booking = await Booking.deleteOne({
        _id: req.params.id
    });

    //Skickar avbokningsmejl
    let mailContent = {
        from: "booking@purplenurples.se",
        to: customer.email,
        subject: "Avbokningsbekräftelse hos Purple Nurples",
        text: `
        Hej ${customer.name}. 
        Din bokning den ${bookingInfo.date} för ${bookingInfo.amountOfGuests} personer, klockan ${bookingInfo.time} har avbokats.
        Ring oss på 08-666666 om du har några frågor.`
      };

    sendFrom.sendMail(mailContent, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent (info.respsonse): ', info.response);
        }
      
      });

    // res.send("Det funkade" + booking);

});

//Uppdaterar en befintlig bokning med hjälp av id från react-urlen
router.put("/admin/update/:id", async (req, res) => {
    const bookingInfo = await Booking.findOne({
        _id: req.params.id
    });
    await Booking.updateOne({_id:req.params.id}, 
        {$set: {
            date: req.body.updateBookings.date, 
            time: req.body.updateBookings.time, 
            amountOfGuests: req.body.updateBookings.amountOfGuests, 
        }});
        res.send("Send the updated customer");
});

module.exports = router;