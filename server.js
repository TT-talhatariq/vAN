const express = require('express')
const cors = require('cors')
const userRouter = require('./routes/userRoutes')
const eventRouter = require('./routes/eventRoutes')
const swaggerUi = require('swagger-ui-express')
const swaggerDocs = require('./swagger')

const mongoose = require('mongoose')
const dotenv = require('dotenv')

const app = express()

dotenv.config({ path: './.env' })

mongoose.connect(process.env.MONGO_DB_URL).then(() => {})

app.use(cors())

// every time same.
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use('/user', userRouter)
app.use('/event', eventRouter)

// app.use("/", (req, res) => {
//   console.log("Request Received");
//   res.send("Hello World");
// });

app.listen(3000, () => {})
