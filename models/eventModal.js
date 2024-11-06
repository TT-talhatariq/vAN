const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  date: {
    type: String,
  },
  duration: {
    type: String,
  },
  location: {
    type: String,
  },
  description: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;

//Event → title, date, duration, location, description, userId
