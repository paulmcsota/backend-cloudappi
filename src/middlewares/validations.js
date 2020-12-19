const { request, response } = require('express');
const { validationResult } = require('express-validator');
const { messageResponse } = require('../helpers/messageResponse');

const validateFieldsUser = (req = request, res = response, next) => {
   
   const errors = validationResult(req);

   if (!errors.isEmpty()) {
      return res.status(405).json(messageResponse.INVALID_INPUT_USER);
   }
   // if (!errors.isEmpty()) {
   //    return res.status(400).json ({
   //       ok: false,
   //       errors: errors.mapped()
   //    });
   // }
   next();
}

module.exports = {
   validateFieldsUser
}