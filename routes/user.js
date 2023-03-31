const { Router } = require('express');
const { check } = require('express-validator');

const Role = require('../models/role');
const { validateFields} = require('../middlewares/field-validations');

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
    check('name', 'Name is mandatory').not().isEmpty(),
    check('email', 'Email is not valid').isEmail(),
    check('password', 'Password must have 6 characters').isLength({ min: 6 }),
    //check('role', 'Not a valid role').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role', ).custom(async(role = '') => {
        const roleExists = await Role.findOne({role});
        if (!roleExists) {
            throw new Error(`Role ${role} does not exist`);
        }
    }),
    validateFields
],usersPost);

router.put('/:id', usersPut);
router.patch('/', usersPatch);
router.delete('/', usersDelete);

module.exports = router;