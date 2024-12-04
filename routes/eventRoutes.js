const express = require('express')
const Event = require('../models/eventModal')
const protect = require('../middelware/auth')
const router = express.Router()

router.get('/all', protect, async (req, res) => {
  const allEvents = await Event.find().populate('userId')

  res.send(allEvents)
})

router.post('/create', protect, async (req, res) => {
  let data = req.body

  const event = await Event.create(data)
  res.send(event)
})

router.put('/edit/:id', protect, async (req, res) => {
  let data = req.body
  const params = req.params

  const event = await Event.findByIdAndUpdate(params.id, data)
  res.send(event)
})

router.delete('/delete', protect, (req, res) => {
  res.send('Deleted')
})

module.exports = router
