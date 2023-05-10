const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { validationResult } = require('express-validator');

const usersGet = async(req = request, res = response) => {
    //const { id, active = true } = req.query;
    const { limit = 5, from = 0 } = req.query;
    const condition = { state: true };

    //Promise.all allows us to execute the two non related queries so we can save time.
    const [users, total] = await Promise.all([
        User.find(condition)
            .limit(Number(limit))
            .skip(Number(from)),
        User.countDocuments(condition)
    ]);

    res.json({ total, users });
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

const usersPut = async(req, res = response) => {
    const { id } = req.params;
    const { _id, password, google, email, ...resto } = req.body;

    //TODO: validate against db

    if (password) {
        // Encrypt password
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }
    
    const user = await User.findByIdAndUpdate(id, resto, { new: true });

    res.json(user);
}

const usersDelete = (req, res = response) => {
    res.json({
        msg: "delete API - usersDelete"
    });
}

const usersPatch = (req, res = response) => {
    res.json({
        msg: "patch API - usersPatch"
    });
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete,
    usersPatch
}