const { response, request } = require('express');

const userGet = (req = request, res = response) => {

    const { q, page = 1 } = req.query

    res.json({
        msg: 'get API',
        q,
        page
    })
}

const userPost = (req, res = response) => {

    const { nombre, edad } = req.body;

    res.status(201).json({
        msg: 'post API',
        nombre,
        edad
    })
}

const userPut = (req, res = response) => {

    const id = req.params.id;

    res.status(201).json({
        msg: 'put API',
        id
    })
}

const userDelete = (req, res = response) => {

    const id = req.params.id;

    res.status(201).json({
        msg: 'delete API',
        id
    })
}

module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete
}