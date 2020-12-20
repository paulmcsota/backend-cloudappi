const request = require('supertest');
// const express = require('express');
const { app, server } = require('../../../index');

describe('Pruebas en user.controller', () => {

   // closing the server
   afterEach(async () => {
       await server.close();        
   });

   describe('endPoint GET: getUsers', () => {
      
      it('Debe retornar el código de estado "200"', async () => {
         const res = await request(app).get('/users/getusers').set('Accept', 'application/json');

         expect(res.statusCode).toEqual(200);
      });
      
      it('Debe retornar un arreglo', async () => {
         const res = await request(app).get('/users/getusers').set('Accept', 'application/json');

         expect(Array.isArray(res.body)).toEqual(true);
      });

      it('Debe retornar los tipos de datos correctos de las props del arreglo de objetos de usuarios si existe al menos un elemento en base de datos', async() => {
         const res = await request(app).get('/users/getusers').set('Accept', 'application/json');
         if (res.body.length > 0) {
            expect(typeof res.body[0].id).toEqual('number');
            expect(typeof res.body[0].name).toEqual('string');
            expect(typeof res.body[0].email).toEqual('string');
            expect(typeof res.body[0].birthDate).toEqual('string');
            expect(typeof res.body[0].address.id).toEqual('number');
            expect(typeof res.body[0].address.street).toEqual('string');
            expect(typeof res.body[0].address.state).toEqual('string');
            expect(typeof res.body[0].address.city).toEqual('string');
            expect(typeof res.body[0].address.country).toEqual('string');
            expect(typeof res.body[0].address.zip).toEqual('string');
         }
         
      });
      
   });


   describe('endPoint POST: createUsers', () => {
      
      const userTest = {
         id: 0,
         name: 'Jose canales',
         email: 'paulmcsota@gmail.com',
         birthDate: '2016-02-26T23:44:42.123',
         address: {
            id: 0,
            street: 'Conj. Hab. Jorge Basadre Grohmann Mz B Lote 24',
            state: 'Peru',
            city: 'Tacna',
            country: 'Tacna',
            zip: '23001'
         }
      }
      it('Debe retornar el código de estado "201" al crear un usuario', async () => {
         const res = await request(app)
            .post('/users/createUsers')
            .set('Accept', 'application/json')
            .send(userTest);

         expect(res.statusCode).toEqual(201);
      });
      
      it('Debe retornar los tipos de datos correctos de las propiedades usuario ingresado', async() => {
         const res = await request(app)
            .post('/users/createUsers')
            .set('Accept', 'application/json')
            .send(userTest);

            expect(typeof res.body.id).toEqual('number');
            expect(typeof res.body.name).toEqual('string');
            expect(typeof res.body.email).toEqual('string');
            expect(typeof res.body.birthDate).toEqual('string');
            expect(typeof res.body.address.id).toEqual('number');
            expect(typeof res.body.address.street).toEqual('string');
            expect(typeof res.body.address.state).toEqual('string');
            expect(typeof res.body.address.city).toEqual('string');
            expect(typeof res.body.address.country).toEqual('string');
            expect(typeof res.body.address.zip).toEqual('string');
      });

      it('Debe retornar el código de estado "405" si existe una entrada inválida en el body', async () => {

         userTest.birthDate = 'Cadena de texto de prueba';
         const res = await request(app)
            .post('/users/createUsers')
            .set('Accept', 'application/json')
            .send(userTest);

         
         expect(res.statusCode).toEqual(405);

         const INVALID_INPUT_USER_MESSAGE_RESPONSE = 'Invalid input';
         expect(res.body).toEqual(INVALID_INPUT_USER_MESSAGE_RESPONSE);
      });
      
   });

   
   describe('endPoint GET: getusersById/{userId}', () => {
      
      it('Debe retornar el código de estado "200" y los tipos de datos correctos', async () => {
         const userId = 5;
         const res = await request(app).get(`/users/getusersById/${userId}`).set('Accept', 'application/json');

         expect(res.statusCode).toEqual(200);

         expect(typeof res.body.id).toEqual('number');
         expect(typeof res.body.name).toEqual('string');
         expect(typeof res.body.email).toEqual('string');
         expect(typeof res.body.birthDate).toEqual('string');
         expect(typeof res.body.address.id).toEqual('number');
         expect(typeof res.body.address.street).toEqual('string');
         expect(typeof res.body.address.state).toEqual('string');
         expect(typeof res.body.address.city).toEqual('string');
         expect(typeof res.body.address.country).toEqual('string');
         expect(typeof res.body.address.zip).toEqual('string');
      });
      
      it('Debe retornar el código de estado "400" y el mensaje correcto de identificador de usuario inválido', async () => {
         const userId = 'dwq';
         const res = await request(app).get(`/users/getusersById/${userId}`).set('Accept', 'application/json');

         const INVALID_USER_MESSAGE_RESPONSE = 'Invalid user id';
         
         expect(res.statusCode).toEqual(400);
         expect(res.body).toEqual(INVALID_USER_MESSAGE_RESPONSE);
      });

      it('Debe retornar el código de estado "404" y el mensaje correcto de usuario no encontrado', async () => {
         const userId = 2500;
         const res = await request(app).get(`/users/getusersById/${userId}`).set('Accept', 'application/json');

         const NOT_FOUND_USER_MESSAGE_RESPONSE = 'User not found';
         
         expect(res.statusCode).toEqual(404);
         expect(res.body).toEqual(NOT_FOUND_USER_MESSAGE_RESPONSE);
      });

   });

   
   describe('endPoint PUT: updateUsersById/{userId}', () => {
      
      const userTest = {
         id: 20,
         name: 'Jose ramirez vega',
         email: 'jramirez@gmail.com',
         birthDate: '2016-02-26T23:44:42.123',
         address: {
            id: 20,
            street: 'Asoc. los nogales Mz B Lote 24',
            state: 'Peru',
            city: 'Cusco',
            country: 'Cusco',
            zip: '08002'
         }
      }
      it('Debe retornar el código de estado "200" y el usuario editado', async () => {
         const userId = userTest.id;
         const res = await request(app)
            .put(`/users/updateUsersById/${userId}`)
            .set('Accept', 'application/json')
            .send(userTest);

         expect(res.statusCode).toEqual(200);
         expect(res.body.id).toEqual(userTest.id);
         expect(res.body.name).toEqual(userTest.name);
         expect(res.body.email).toEqual(userTest.email);
         expect(res.body.birthDate).toEqual(userTest.birthDate);
         expect(res.body.address.id).toEqual(userTest.address.id);
         expect(res.body.address.street).toEqual(userTest.address.street);
         expect(res.body.address.state).toEqual(userTest.address.state);
         expect(res.body.address.city).toEqual(userTest.address.city);
         expect(res.body.address.country).toEqual(userTest.address.country);
         expect(res.body.address.zip).toEqual(userTest.address.zip);
      });
      

      it('Debe retornar el código de estado "400" y el mensaje correcto de identificador de usuario inválido', async () => {
         userTest.id = 'ada';
         const userId = userTest.id;
         const res = await request(app)
            .put(`/users/updateUsersById/${userId}`)
            .set('Accept', 'application/json')
            .send(userTest);

         const INVALID_USER_MESSAGE_RESPONSE = 'Invalid user id';
         
         expect(res.statusCode).toEqual(400);
         expect(res.body).toEqual(INVALID_USER_MESSAGE_RESPONSE);
      });

      it('Debe retornar el código de estado "404" y el mensaje correcto de usuario no encontrado', async () => {
         userTest.id = 2500;
         const userId = userTest.id;
         const res = await request(app)
            .put(`/users/updateUsersById/${userId}`)
            .set('Accept', 'application/json')
            .send(userTest);

         const NOT_FOUND_USER_MESSAGE_RESPONSE = 'User not found';
         
         expect(res.statusCode).toEqual(404);
         expect(res.body).toEqual(NOT_FOUND_USER_MESSAGE_RESPONSE);
      });
      
   });


   describe('endPoint DELETE: deleteUsersById/{userId}', () => {
      const userTest = {
         id: 0,
         name: 'Jose canales',
         email: 'paulmcsota@gmail.com',
         birthDate: '2016-02-26T23:44:42.123',
         address: {
            id: 0,
            street: 'Conj. Hab. Jorge Basadre Grohmann Mz B Lote 24',
            state: 'Peru',
            city: 'Tacna',
            country: 'Tacna',
            zip: '23001'
         }
      }
      it('Debe retornar el código de estado "200" al eliminar el usuario', async () => {
         const resCreateUser = await request(app).post('/users/createUsers').set('Accept', 'application/json').send(userTest);
         
         const resDeleteUser = await request(app).delete(`/users/deleteUsersById/${resCreateUser.body.id}`).set('Accept', 'application/json');

         const OK_MESSAGE_RESPONSE = 'OK';

         expect(resDeleteUser.statusCode).toEqual(200);
         expect(resDeleteUser.body).toEqual(OK_MESSAGE_RESPONSE);
      });
      

      it('Debe retornar el código de estado "400" y el mensaje de identificador de usuario inválido', async () => {
         const userId = 'asda';
         const res = await request(app)
            .delete(`/users/deleteUsersById/${userId}`)
            .set('Accept', 'application/json');

         const INVALID_USER_MESSAGE_RESPONSE = 'Invalid user id';
         
         expect(res.statusCode).toEqual(400);
         expect(res.body).toEqual(INVALID_USER_MESSAGE_RESPONSE);
      });

      it('Debe retornar el código de estado "404" y el mensaje de usuario no encontrado', async () => {
         const userId = Math.floor(Math.random() * 6000) + 5000;
         const res = await request(app)
            .delete(`/users/deleteUsersById/${userId}`)
            .set('Accept', 'application/json');

         const NOT_FOUND_USER_MESSAGE_RESPONSE = 'User not found';
         
         expect(res.statusCode).toEqual(404);
         expect(res.body).toEqual(NOT_FOUND_USER_MESSAGE_RESPONSE);
      });
      
   });
});

