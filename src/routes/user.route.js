/*
   Rutas de usuario / Auth
   host + api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validateFieldsUser } = require('../middlewares/validations');
const { getUsers, createUsers, getUsersById, updateUsersById, deleteUsersById } = require('../controllers/user.controller');

const router = Router();

router.get(
   '/getusers', 
   getUsers
);

router.post(
   '/createUsers', 
   [
      check('name').not().isEmpty().trim().isLength({max: 100}),
      check('email').isEmail().trim().isLength({max: 50}),
      check('birthDate').isISO8601({strict: true}).trim().isLength({max: 50}),
      check('address.street').not().isEmpty().trim().isLength({max: 100}),
      check('address.state').not().isEmpty().trim().isLength({max: 50}),
      check('address.city').not().isEmpty().trim().isLength({max: 50}),
      check('address.country').not().isEmpty().trim().isLength({max: 50}),
      check('address.zip').not().isEmpty().trim().isLength({max: 50}),
      validateFieldsUser
   ],
   createUsers
);

router.get(
   '/getusersById/:userId', 
   getUsersById
);

router.put(
   '/updateUsersById/:userId', 
   [
      check('name').not().isEmpty().trim().isLength({max: 100}),
      check('email').isEmail().trim().isLength({max: 50}),
      check('birthDate').isISO8601({strict: true}).trim().isLength({max: 50}),
      check('address.street').not().isEmpty().trim().isLength({max: 100}),
      check('address.state').not().isEmpty().trim().isLength({max: 50}),
      check('address.city').not().isEmpty().trim().isLength({max: 50}),
      check('address.country').not().isEmpty().trim().isLength({max: 50}),
      check('address.zip').not().isEmpty().trim().isLength({max: 50}),
      validateFieldsUser
   ],
   updateUsersById
);

router.delete(
   '/deleteUsersById/:userId', 
   deleteUsersById
);


module.exports = router;