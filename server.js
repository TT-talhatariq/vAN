const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use("/", (req, res) => {
  console.log("Request Received");
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log("Backend / Server is Live at PORT 3000");
});
