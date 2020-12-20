# REST API de usuarios

Este es una aplicación que permite dar de alta, modificar, eliminar y consultar usuarios

La aplicación se encuentra desarrollada en Node.js utilizando Express.js

La base de datos utilizada es Mysql 8.0

Para las pruebas unitarias se utilizó Jest

## Swagger

   La aplicación se desarrollo cumpliendo los recursos definidos en el siguiente swagger: https://s3-eu-west-1.amazonaws.com/mmi-codechallenge/swagger-users-v1.json

   La swagger de la aplicación se encuentra en la siguiente dirección: https://app-backend-cloudappi-paulsota.herokuapp.com/

## Postman

   La documentación en Postman de la aplicación se encuentra en la siguiente dirección: https://documenter.getpostman.com/view/6668361/TVsuBSCa

## .env

   Se debe tener una instancia de MySQL.
   
### development.env

   HOST_URL=localhost  --> Host de la instancia.
   HOST_PORT=3306  --> Puerto de la instancia.
   HOST_USER=sa  --> Usuario de la base de datos.
   HOST_PASSWORD=Tacna*2020  --> Contraseña del usuario de la base de datos.
   HOST_DIALECT=mysql  --> Dialecto de la instancia
   HOST_DATABASE=cloudappi  --> Nombre de la base de datos (la base de datos debe crearse antes de lanzar la aplicación.

### test.env

   HOST_URL=localhost  --> Host de la instancia.
   HOST_PORT=3306  --> Puerto de la instancia.
   HOST_USER=sa  --> Usuario de la base de datos.
   HOST_PASSWORD=Tacna*2020  --> Contraseña del usuario de la base de datos.
   HOST_DIALECT=mysql  --> Dialecto de la instancia
   HOST_DATABASE=cloudappi_test  --> Nombre de la base de datos (la base de datos debe crearse antes de lanzar la aplicación.
   PORT= 3001  --> Puerto donde se ejecutará la aplicación.

## Install

   npm install

## Run the app in development mode

   npm run dev

## Run the tests

   npm test

# Schemes

   Localmente se ejecuta con el protocolo http y la aplicación desplegada en heroku con https

## Gets all users from the database

### Request

`GET /users/getusers`

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
 
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
 
    fetch("https://app-backend-cloudappi-paulsota.herokuapp.com/users/getusers", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

### Headers

    Content-Type application/json

### Parameters

    No parameters

### Response

#### 200

    Content-Type: application/json

    Example Value
    [
      {
         "id": 0,
         "name": "string",
         "email": "string",
         "birthDate": "string",
         "address": {
            "id": 0,
            "street": "string",
            "state": "string",
            "city": "string",
            "country": "string",
            "zip": "string"
         }
      }
    ]

## Create a user in the database

### Request

`POST /users/createUsers`

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
 
    var raw = JSON.stringify({"id":0,"name":"2wq","email":"paulmcsota@gmail.com","birthDate":"2016-02-26T23:44:42.123","address":{"id":0, "street":"Conj. Hab. Jorge Basadre Grohmann Mz B Lote 24","state":"Peru","city":"Tacna","country":"Tacna","zip":"23001"}});
 
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
 
    fetch("https://app-backend-cloudappi-paulsota.herokuapp.com/users/createUsers", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

### Headers

    Content-Type: application/json

### Body
    {
        "id": 0,
        "name": "2wq",
        "email": "paulmcsota@gmail.com",
        "birthDate": "2016-02-26T23:44:42.123",
        "address": {
            "id": 0,
            "street": "Conj. Hab. Jorge Basadre Grohmann Mz B Lote 24",
            "state": "Peru",
            "city": "Tacna",
            "country": "Tacna",
            "zip": "23001"
        }
    }

### Response

#### 201

    Content-Type: application/json

    Example Value
    {
        "id": 1,
        "name": "2wq",
        "email": "paulmcsota@gmail.com",
        "birthDate": "2016-02-26T23:44:42.123",
        "address": {
            "id": 1,
            "street": "Conj. Hab. Jorge Basadre Grohmann Mz B Lote 24",
            "state": "Peru",
            "city": "Tacna",
            "country": "Tacna",
            "zip": "23001"
        }
    }

#### 405

    Content-Type: application/json

    Example Value
    "Invalid input"

## Get a user by userId from the database

### Request

`GET /getusersById/{userId}`

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = "";
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("https://app-backend-cloudappi-paulsota.herokuapp.com/users/getusersById/{userId}", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

### Headers

    Content-Type: application/json

### Parameters

    userId: integer

### Response

#### 200

    Content-Type: application/json

    Example Value
    {
        "id": 1,
        "name": "2wq",
        "email": "paulmcsota@gmail.com",
        "birthDate": "2016-02-26T23:44:42.123",
        "address": {
            "id": 1,
            "street": "Conj. Hab. Jorge Basadre Grohmann Mz B Lote 24",
            "state": "Peru",
            "city": "Tacna",
            "country": "Tacna",
            "zip": "23001"
        }
    }

#### 400

    Content-Type: application/json

    Example Value
    "Invalid user id"

#### 404

    Content-Type: application/json

    Example Value
    "User not found"

## Update a user by userId in the database

### Request

`PUT /users/updateUsersById/{userId}`

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({"id":1,"name":"Paul","email":"paulmcsota@gmail.com","birthDate":"2016-02-26T23:44:42.123","address":{"id":1,    "street":"Conj. Hab. Jorge Basadre Grohmann Mz B Lote 24","state":"Peru","city":"Tacna","country":"Tacna","zip":"23001"}});
    
    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("https://app-backend-cloudappi-paulsota.herokuapp.com/users/updateUsersById/1", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

### Headers

    Content-Type: application/json

### Body
    {
        "id": 1,
        "name": "Paul Lionel Mesco Sota",
        "email": "paulmcsota@gmail.com",
        "birthDate": "2020-10-30T23:44:42.123",
        "address": {
            "id": 1,
            "street": "Conj. Hab. Jorge Basadre Grohmann Mz B Lote 24",
            "state": "Peru",
            "city": "Tacna",
            "country": "Tacna",
            "zip": "23001"
        }
    }

### Response

#### 200

    Content-Type: application/json

    Example Value
    {
        "id": 1,
        "name": "2wq",
        "email": "paulmcsota@gmail.com",
        "birthDate": "2016-02-26T23:44:42.123",
        "address": {
            "id": 1,
            "street": "Conj. Hab. Jorge Basadre Grohmann Mz B Lote 24",
            "state": "Peru",
            "city": "Tacna",
            "country": "Tacna",
            "zip": "23001"
        }
    }

#### 400

    Content-Type: application/json

    Example Value
    "Invalid user id"

#### 404

    Content-Type: application/json

    Example Value
    "User not found"

## Delete a user by userId from the database

### Request

`DELETE /users/deleteUsersById/{userId}`

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = "";
    
    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("https://app-backend-cloudappi-paulsota.herokuapp.com/users/deleteUsersById/1", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

### Headers

    Content-Type: application/json

### Parameters

    userId: integer

### Response

#### 200

    Content-Type: application/json

    Example Value
    "OK"

#### 400

    Content-Type: application/json

    Example Value
    "Invalid user id"

#### 404

    Content-Type: application/json

    Example Value
    "User not found"