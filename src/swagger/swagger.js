
const swaggerJSDoc = require('swagger-jsdoc');
const { port, NODE_ENV } = require('../../config');
const path = require('path');
 
const pathFileRoute = path.resolve(__dirname + '../../routes/user.route.js');
const host = NODE_ENV === 'development' ? `localhost:${port}` : process.env.BASE_URL;

const options = {
   swaggerDefinition: {
      swagger: '2.0.0',
      info: {
         description: 'Users API',
         version: '1.0.0',
         title: 'Users',
      },
      host,
      basePath: '/users',
      schemes: [
         'http',
         'https'
      ],
      produces: [
         'application/json'
      ],
      consumes: [
         'application/json'
      ],
      definitions: {
         user: {
            properties: {
               id: {
                  type: 'integer'
               },
               name: {
                  type: 'string'
               },
               email: {
                  type: 'string'
               },
               birthDate: {
                  type: 'string',
                  format: 'LocalDateTime',
                  description: 'LocalDateTime type'
               },
               address: {
                  $ref: '#/definitions/address'
               }
            }
         },
         address: {
            properties: {
               id: {
                  type: 'integer'
               },
               street: {
                  type: 'string'
               },
               state: {
                  type: 'string'
               },
               city: {
                  type: 'string'
               },
               country: {
                  type: 'string'
               },
               zip: {
                  type: 'string'
               }
            }
         }
      }
   },
   apis: [pathFileRoute],

};
const swaggerDocument = swaggerJSDoc(options);

module.exports = {
   swaggerDocument
}