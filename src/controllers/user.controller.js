const { request, response } = require('express');
const userService = require('../services/user.service');
const { messageResponse } = require('../helpers/messageResponse');



const getUsers = async (req = request, res = response) => {
   try {
      const users = await userService.getAllUsers();

      return res.status(200).json(users);

   } catch (error) {
      console.log(error);
      return res.status(500).json('Error getting users, please contact the system administrator.');
   }
}

const createUsers = async (req = request, res = response) => {
   try {

      const userDTO = req.body;

      const result = await userService.createUser(userDTO);

      return res.status(result.code).json(result.resp);

   } catch {
      return res.status(500).json('Error creating user, please contact the system administrator.');
   }
}

const getUsersById = async (req = request, res = response) => {
   try {
      const userId = Number(req.params.userId) || 0;
      if (!userId) {
         return res.status(400).json(messageResponse.INVALID_USER);
      }
      
      const user = await userService.getUsersById(userId);

      if (!user) {
         return res.status(404).json(messageResponse.NOT_FOUND_USER);
      }

      return res.status(200).json(user);
   } catch {
      return res.status(500).json('Error getting user, please contact the system administrator.');
   }
}

const updateUsersById = async (req = request, res = response) => {
   try {
      const userId = Number(req.params.userId) || 0;
      if (!userId) {
         return res.status(400).json(messageResponse.INVALID_USER);
      }

      const userDTO = req.body;
      
      const result = await userService.updateUsersById(userId, userDTO);

      return res.status(result.code).json(result.resp);

   } catch {
      return res.status(500).json('Error udpating user, please contact the system administrator.');
   }
}

const deleteUsersById = async (req = request, res = response) => {
   try {
      const userId = Number(req.params.userId) || 0;
      if (!userId) {
         return res.status(400).json(messageResponse.INVALID_USER);
      }
      
      const user = await userService.deleteUsersById(userId);

      if (!user) {
         return res.status(404).json(messageResponse.NOT_FOUND_USER);
      }

      return res.status(200).json('OK');
   } catch {
      return res.status(500).json('Error deleting user, please contact the system administrator.');
   }
}




module.exports = {
   getUsers,
   createUsers,
   getUsersById,
   updateUsersById,
   deleteUsersById
}