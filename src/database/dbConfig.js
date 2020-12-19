const { Sequelize } = require('sequelize');
const UserModel = require('../models/user.model');
const AddressModel = require('../models/address.model');

const sequelize = new Sequelize('cloudappi', process.env.HOST_USER, process.env.HOST_PASSWORD,{
   dialect: process.env.HOST_DIALECT,
   host: process.env.HOST_URL,
   port: process.env.HOST_PORT,
   logging: false
});

const Address = AddressModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize);

Address.hasOne(User, { foreignKey: 'addressId'});
User.belongsTo(Address, { foreignKey: 'addressId'});


sequelize.sync({ force: false });

module.exports = {
   User,
   Address,
   sequelize,
};