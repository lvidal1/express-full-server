const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require("../models/user");

const userGet = async (req = request, res = response) => {

    const { limit = 5, from = 0 } = req.query
    const query = { status: true }

    const [total, usuarios] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(from))
            .limit(Number(limit))
    ])

    res.json({
        total,
        usuarios
    })
}

const userPost = async (req, res = response) => {

    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });

    // Encrypt password
    const salt = bcryptjs.genSaltSync(10);
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();

    res.status(201).json({
        user
    })
}

const userPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, email, ...rest } = req.body;

    if (password) {
        const salt = bcryptjs.genSaltSync(10);
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, rest);

    res.status(201).json(user)
}

const userDelete = async (req, res = response) => {

    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, { status: false });

    res.status(201).json(user)
}

module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete
}