const userRepository = require('../repositories/user.repository');
const { messageResponse } = require('../helpers/messageResponse');


const getAllUsers = async () => {
   return await userRepository.getAllUsers();
}

const createUser = async (user) => {

   const userFoundById = await getUsersById(user.id);

   if (userFoundById) {
      return {
         code: 400,
         resp: messageResponse.ALREADY_EXISTS_USER
      }
   }
   const userCreated = await userRepository.createUser(user);
   return {
      code: 201,
      resp: userCreated
   }
}

const getUsersById = async (userId) => {
   return await userRepository.getUsersById(userId);
}

const updateUsersById = async (userId, user) => {

   const userFoundById = await getUsersById(userId);

   if (!userFoundById) {
      return {
         code: 404,
         resp: messageResponse.NOT_FOUND_USER
      }
   }
   const userUpdated = await userRepository.updateUsersById(userId, user);

   return {
      code: 200,
      resp: userUpdated
   }
}

const deleteUsersById = async (userId) => {
   return await userRepository.deleteUsersById(userId);
}

module.exports = {
   getAllUsers,
   createUser,
   getUsersById,
   updateUsersById,
   deleteUsersById,
}