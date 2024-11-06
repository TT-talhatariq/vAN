const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  confirmPassword: {
    type: String,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
  },
  age: {
    type: Number,
    min: 15,
  },
})

const User = mongoose.model('User', userSchema)
module.exports = User
