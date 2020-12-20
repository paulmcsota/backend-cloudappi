const { Sequelize } = require('sequelize');
const UserModel = require('../models/user.model');
const AddressModel = require('../models/address.model');
const { dbName, dbUser, dbPassword, dbDialect, dbUrl, dbPort } = require('../../config');



const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
   dialect: dbDialect,
   host: dbUrl,
   // port: dbPort,
   logging: false,
});
const Address = AddressModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize);

Address.hasOne(User, { foreignKey: 'addressId'});
User.belongsTo(Address, { foreignKey: 'addressId'});


sequelize.sync({force: false})


module.exports = {
   User,
   Address,
   sequelize,
};