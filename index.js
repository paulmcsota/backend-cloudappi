const colors = require('colors');

const express = require('express');
require('dotenv').config();
// const { dbConnectionSQL } = require('./src/database/dbConfig');
const { sequelize } = require('./src/database/dbConfig');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// Crear el servidor de express
const app = express();

// Uso de cors
app.use(cors());
// Directorio público
// app.use(express.static('public'));
// Lectura y parseo del body
app.use(express.json());

// const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Base de datos
// dbConnectionSQL();
sequelize.authenticate().then( () => {
   console.log('Connection to database successfully.'.blue);
}).catch((err) => {
   console.error('Unable to connect to the database:'.red, error);
});


// Rutas
// app.use('/api/auth', require('./src/routes/AuthRoute'));
app.use('/users', require('./src/routes/user.route'));
// TODO auth: crear, login, renew
// TODO CRUD: Eventos

process.env.PORT = process.env.PORT || 4000;
// Escuchar peticiones
app.listen(process.env.PORT, () => {
   console.log(`Server running on port: ${process.env.PORT}`.green);
});