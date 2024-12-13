const express = require('express')
const cors = require('cors')
const userRouter = require('./routes/userRoutes')
const eventRouter = require('./routes/eventRoutes')
const swaggerUi = require('swagger-ui-express')
const swaggerDocs = require('./swagger')
const rateLimit = require('express-rate-limit')

const mongoose = require('mongoose')
const dotenv = require('dotenv')

const app = express()

dotenv.config({ path: './.env' })
app.use(express.json())

mongoose.connect(process.env.MONGO_DB_URL).then(() => {
  console.log('DB Conntected')
})

app.use(cors())

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many request from this api. Try again later',
  headers: true,
})

app.use('/', limiter)

// every time same.
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use('/user', userRouter)
app.use('/event', eventRouter)

// app.use("/", (req, res) => {
//   console.log("Request Received");
//   res.send("Hello World");
// });

app.listen(3000, () => {})
