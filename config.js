const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
   path: path.resolve(__dirname, process.env.NODE_ENV + '.env')
})

module.exports = {
   NODE_ENV: process.env.NODE_ENV || 'development',
   port:  process.env.PORT || 4000,
   dbUrl: process.env.HOST_URL || 'localhost',
   dbPort: process.env.HOST_PORT || 3306,
   dbUser: process.env.HOST_USER || 'sa',
   dbPassword: process.env.HOST_PASSWORD || 'Tacna*2020',
   dbDialect: process.env.HOST_DIALECT || 'mysql',
   dbName: process.env.HOST_DATABASE || 'cloudappi',
}
