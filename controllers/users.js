const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { validationResult } = require('express-validator');

const usersGet = (req = request, res = response) => {
const { id, active = true } = req.query;

    res.json({
        msg: "get API - controller",
        id,
        active
    });
}

const usersPost = async(req, res = response) => {
    
    const {name, email, password, role} = req.body;
    const user = new User({name, email, password, role}); 

    // Encrypt password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    // Save DB
    await user.save();

    res.json({
        user
    });
}

const usersPut = (req, res = response) => {
    const { id } = req.params;
    res.json({
        msg: "put API - controller",
        id
    });
}

const usersDelete = (req, res = response) => {
    res.json({
        msg: "delete API - controller"
    });
}

const usersPatch = (req, res = response) => {
    res.json({
        msg: "patch API - controller"
    });
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete,
    usersPatch
}