const { request, response } = require('express');

const usersGet = (req = request, res = response) => {
const { id, active = true } = req.query;

    res.json({
        msg: "get API - controller",
        id,
        active
    });
}

const usersPost = (req, res = response) => {
    const {name, age} = req.body;
    res.json({
        msg: "post API - controller",
        name,
        age
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