require('dotenv').config();

const colors = require('colors');
const express = require('express');
const { port } = require('./config');
const { sequelize } = require('./src/database/dbConfig');
const cors = require('cors');

const swaggerUi = require('swagger-ui-express');
const { swaggerDocument } = require('./src/swagger/swagger');

// Crear el servidor de express
const app = express();
// Uso de cors
app.use(cors());
// Lectura y parseo del body
app.use(express.json());
// Rutas
app.use('/users', require('./src/routes/user.route'));

// Server
let server;
if (process.env.NODE_ENV === 'test') {
   server = app.listen(port, () => console.log(`Server running on port: ${port}`.green));
} else {
   // Swagger documentation
   app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
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