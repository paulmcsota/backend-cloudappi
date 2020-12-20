require('dotenv').config();

process.env.PORT = process.env.PORT || 4000;

module.exports = {
   port: process.env.NODE_ENV === 'test' ? 3001 : process.env.PORT,
   dbUrl: process.env.NODE_ENV === 'test' ? process.env.HOST_URL_TEST : process.env.HOST_URL,
   dbPort: process.env.NODE_ENV === 'test' ? process.env.HOST_PORT_TEST : process.env.HOST_PORT,
   dbUser: process.env.NODE_ENV === 'test' ? process.env.HOST_USER_TEST : process.env.HOST_USER,
   dbPassword: process.env.NODE_ENV === 'test' ? process.env.HOST_PASSWORD_TEST : process.env.HOST_PASSWORD,
   dbDialect: process.env.NODE_ENV === 'test' ? process.env.HOST_DIALECT_TEST : process.env.HOST_DIALECT,
   dbName: process.env.NODE_ENV === 'test' ? process.env.HOST_DATABASE_TEST : process.env.HOST_DATABASE,
}