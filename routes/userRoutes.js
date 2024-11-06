// routes/user.js
const express = require("express");
const router = express.Router();

router.get("/all", (req, res) => {
  res.send("All Users");
});

router.get("/:id", (req, res) => {
  res.send("One User is this one");
});

router.post("/signup", (req, res) => {
  res.send("Sign Up Done");
});

router.post("/login", (req, res) => {
  res.send("Login Done");
});

router.put("/changePassword", (req, res) => {
  res.send("Change Done");
});

module.exports = router;
