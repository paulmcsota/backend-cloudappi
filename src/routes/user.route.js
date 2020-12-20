/*
   Rutas de usuario / users
   host + users
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validateFieldsUser } = require('../middlewares/validations');
const { getUsers, createUsers, getUsersById, updateUsersById, deleteUsersById } = require('../controllers/user.controller');

const router = Router();

/**
 * @swagger
 * /getusers:
 *    get:
 *       description: Get all users
 *       responses:
 *          200:
 *             description: OK
 *             schema:
 *                type: array
 *                items:
 *                   $ref: '#/definitions/user'
 */
router.get('/getusers', getUsers);

/**
 * @swagger
 * /createUsers:
 *    post:
 *       description: Create a user in the database
 *       parameters:
 *        - in: body
 *          name: user
 *          schema:
 *             $ref: '#definitions/user'
 *          required: true   
 *       responses:
 *          201:
 *             description: CREATED
 *             schema:
 *                $ref: '#/definitions/user'
 *          405:
 *             description: Invalid input
 */
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



/**
 * @swagger
 * /getusersById/{userId}:
 *    get:
 *       description: Get a user by userId from the database
 *       parameters:
 *        - in: path
 *          name: userId
 *          type: integer
 *          required: true   
 *       responses:
 *          200:
 *             description: OK
 *             schema:
 *                $ref: '#/definitions/user'
 *          400:
 *             description: Invalid user id
 *          404:
 *             description: User not found
 */
router.get('/getusersById/:userId', getUsersById);


/**
 * @swagger
 * /updateUsersById/{userId}:
 *    put:
 *       description: Update a user by userId in the database
 *       parameters:
 *        - in: path
 *          name: userId
 *          type: integer
 *          required: true
 *        - in: body
 *          name: user
 *          schema:
 *             $ref: '#definitions/user'
 *          required: true   
 *       responses:
 *          200:
 *             description: OK
 *             schema:
 *                $ref: '#/definitions/user'
 *          400:
 *             description: Invalid user id
 *          404:
 *             description: User not found
 */
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


/**
 * @swagger
 * /deleteUsersById/{userId}:
 *    delete:
 *       description: Delete a user by userId from the database
 *       parameters:
 *        - in: path
 *          name: userId
 *          type: integer
 *          required: true   
 *       responses:
 *          200:
 *             description: OK
 *          400:
 *             description: Invalid user id
 *          404:
 *             description: User not found
 */
router.delete('/deleteUsersById/:userId', deleteUsersById);


module.exports = router;