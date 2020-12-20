const { Address, User, sequelize } = require('../database/dbConfig');

const getAllUsers = async () => {
   const usuarios = await User.findAll({ 
      attributes: ['id', 'name', 'email', 'birthDate'],
      include: [ Address ] 
   });
   
   return usuarios;
   
}

const createUser = async (user) => {
   
   const address = {
      street: user.address.street,
      state: user.address.state,
      city: user.address.city,
      country: user.address.country,
      zip: user.address.zip
   }
   const newAddress = await Address.create(address);

   const dataUser = {
      name: user.name,
      email: user.email,
      birthDate: user.birthDate,
      addressId: newAddress.dataValues.id
   }
   const newUser = await User.create(dataUser);

   const response = {
      ...newUser.dataValues,
      address: newAddress.dataValues
   }
   delete response.addressId;

   return response;
}


const getUsersById = async (userId) => {
   const user = await User.findByPk(userId, {
      attributes: ['id', 'name', 'email', 'birthDate'],
      include: [ Address ] 
   });

   return user;
}

const updateUsersById = async (userId, user) => {

   const address = {
      street: user.address.street,
      state: user.address.state,
      city: user.address.city,
      country: user.address.country,
      zip: user.address.zip
   }
   await Address.update(address, {
      where: {id: user.address.id},
      returning: true,
   });
   const dataUser = {
      name: user.name,
      email: user.email,
      birthDate: user.birthDate,
      addressId: user.address.id
   }
   await User.update(dataUser, {
      where: {id: userId},
      returning: true,
   });

   const response = {
      id: userId,
      ...dataUser,
      address: {
         id: user.address.id,
         ...address,
      }
   }
   delete response.addressId;

   return response;
}


const deleteUsersById = async (userId) => {
   const user = await User.destroy({ where: { id: userId } });

   return user;
}
module.exports = {
   getAllUsers,
   createUser,
   getUsersById,
   updateUsersById,
   deleteUsersById,
}