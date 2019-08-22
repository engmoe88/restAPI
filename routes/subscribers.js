const express = require('express');
const router = express.Router();
const Subscriber = require('../models/subscriber');


// routes that we need to create:
//1- Getting all subscribers
router.get('/', async (req, res) => {
    try {
      const subscribers = await Subscriber.find();
      res.json(subscribers);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});


// 2- getting one subscriber
router.get('/:id', getSubscriber, (req, res) => {
   // try {
   //    const subscriber = await Subscriber.findById(req.params.id)
   //    res.status(201).json(subscriber)
   // } catch (err) {
   //    res.status(500).json({ message: err.message })
   // }
   res.json(res.subscriber);
});


// 3- creating one subscriber
router.post('/', async (req, res) => {
   const subscriber = new Subscriber({
      name: req.body.name,
      subscribedToChannel: req.body.subscribedToChannel
   });
   try {
      const newSubscriber = await subscriber.save();
      res.status(201).json(newSubscriber);
   } catch (err) {
      res.status(400).json({ message: err.message })
   }
});


// 4- updating one subscriber
router.patch('/:id', getSubscriber, async (req, res) => {
    if(req.body.name != null) {
       res.subscriber.name = req.body.name;
    }
    if(req.body.subscribedToChannel != null) {
      res.subscriber.subscribedToChannel = req.body.subscribedToChannel;
   }
   try {
      const updatedSubscriber = await res.subscriber.save()
      res.json(updatedSubscriber);
   } catch (e) {
      res.status(400).json({ message: e.message })
   }
});


// 5- deleting one subscriber
router.delete('/:id', getSubscriber, async (req, res) => {
    try {
         await res.subscriber.remove();
         res.json({ messgae: "Deleted Subscriber"})
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
});

//middleware function to use across the functions that use this common code of the id
async function getSubscriber(req, res, next) {
   let subscriber
   try {
      subscriber = await Subscriber.findById(req.params.id)
      if (subscriber == null) {
         return res.status(404).json({ message: "Cannot find subscriber"});
      }
   } catch (e) {
       return res.status(500).json({ message: e.message });
   }
   res.subscriber = subscriber;
   next();
}

module.exports = router;