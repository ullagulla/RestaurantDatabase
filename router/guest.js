const express = require('express')
const router = express.Router();
const Guest = require('../models/guest');


router.post("/guests", async (req, res) => {
    console.log("Why ", req.body)
    const guests = new Guest({
         customerId:req.body.customerId,
         name: req.body.name,
         emailAddress: req.body.emailAddress,
         phoneNumber: req.body.phoneNumber,
     })
 
      console.log(guests)
 
     await guests.save((error, success) => {
          if (error) {
              res.send(error.message)
         }
     })

  })


router.get("/guests", async (req, res) => {
    const guests = await Guest.find()
    console.log(guests)

    res.send(guests)
})


module.exports = router;