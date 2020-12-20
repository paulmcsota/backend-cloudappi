require('dotenv').config();

const colors = require('colors');
const express = require('express');
const { port } = require('./config');
const { sequelize } = require('./src/database/dbConfig');
const cors = require('cors');

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


// Crear el servidor de express
const app = express();

// Uso de cors
app.use(cors());

// Lectura y parseo del body
app.use(express.json());

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rutas
app.use('/users', require('./src/routes/user.route'));

let server;
// Base de datos
if (process.env.NODE_ENV === 'test') {
   server = app.listen(port, () => console.log(`Server running on port: ${port}`.green));
} else {
   // Escuchar peticiones
   server = app.listen(port, () => console.log(`Server running on port: ${port}`.green));

   sequelize.authenticate().then( () => {
      console.log('Connection to database successfully.'.blue);
   }).catch((err) => {
      console.error('Unable to connect to the database:'.red, err);
   });
   
}

module.exports = {
   app,
   server
};