const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/field-validations');
const { 
    roleIsValid, 
    emailExists, 
    userExistsById
} = require('../helpers/db-validators');

const { 
    usersGet, 
    usersPost, 
    usersPut, 
    usersDelete, 
    usersPatch 
} = require('../controllers/users');

const router = Router();
router.get('/', usersGet);
router.post('/', [
    //check('role', 'Not a valid role').isIn(['ADMIN_ROLE', 'USER_ROLE']), validation against hardcoded values
    //check('role', ).custom( (role) => roleIsValid(role) ) arrow function on custom callback can be simplified

    check('name', 'Name is mandatory').not().isEmpty(),
    check('email', 'Email is not valid').isEmail(),
    check('email').custom(emailExists),
    check('password', 'Password must have 6 characters').isLength({ min: 6 }),
    check('role', ).custom( roleIsValid ),
    validateFields
],usersPost);

router.put('/:id', [
   check('id', 'Not a valid id').isMongoId(),
   check('id').custom(userExistsById),
   check('role', ).custom( roleIsValid ),
   validateFields 
], usersPut);

router.patch('/', usersPatch);
router.delete('/', usersDelete);

module.exports = router;