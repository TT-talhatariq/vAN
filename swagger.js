const swaggerJSDoc = require('swagger-jsdoc')

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Event Management',
      version: '1.0.0',
      description: 'API Documentation for frontend developer',
      contact: {
        name: 'Talha Tariq',
        email: 'talhatariq@gmail.com',
      },
    },
    servers: [
      {
        url: 'http://event.io',
        description: 'Live URL',
      },
    ],
  },
  apis: ['./docs/*.yaml'], // Path to the API documentation files (adjust the path as needed)
}

const swaggerDocs = swaggerJSDoc(swaggerOptions)
module.exports = swaggerDocs
