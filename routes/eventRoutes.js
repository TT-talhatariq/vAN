const express = require('express')
const router = express.Router()

router.get('/all', (req, res) => {
  res.send('All Events')
})

router.post('/create', (req, res) => {
  res.send('Created')
})

router.put('/edit', (req, res) => {
  res.send('Edited')
})

router.delete('/delete', (req, res) => {
  res.send('Deleted')
})

module.exports = router
