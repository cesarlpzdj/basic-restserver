const Role = require('../models/role');
const User = require('../models/user');

const roleIsValid = async(role = '') => {
    const roleExists = await Role.findOne({role});
    if (!roleExists) {
        throw new Error(`Role ${role} is not registered in DB`);
    }
}

const emailExists = async(email = '') => {
    const exists = await User.findOne({email});
    if (exists) {
        throw new Error(`Email ${ email } already registered`);
    }   
}

const userExistsById = async(id = '') => {
    const exists = await User.findById(id);
    if ( !exists ) {
        throw new Error(`User with id ${ id } does not exist`);
    } 
}

module.exports = {
    roleIsValid,
    emailExists,
    userExistsById
}