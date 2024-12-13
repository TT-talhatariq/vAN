const express = require('express')
const Event = require('../models/eventModal')
const protect = require('../middelware/auth')
const sendEmail = require('../utils/email')
const { welcomeEmail } = require('../utils/emailHtml')
const router = express.Router()

const multer = require('multer')

const upload = multer({ storage: multer.memoryStorage() })

router.get('/all', protect, async (req, res) => {
  const allEvents = await Event.find().populate('userId')

  res.send(allEvents)
})

router.post('/create', protect, async (req, res) => {
  let data = req.body

  // get pic from user.

  // save it in uploads folder

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

router.post('/send-card', upload.single('photo'), async (req, res) => {
  try {
    const file = req.file // Extract the uploaded file
    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' })
    }

    // Email options
    const options = {
      subject: 'Your Venue',
      email: 'tt.talhatariq1@gmail.com',
      text: 'We received a request to reset your password for your Eventify account. Click the button below to reset it',
      html: welcomeEmail(),
      attachment: file,
    }

    // Send email
    await sendEmail(options)

    res
      .status(200)
      .json({ message: 'Reset Link Sent to Your Email with attachment' })
  } catch (error) {
    res.status(500).json({ message: 'Failed to send email', error })
  }
})

module.exports = router
