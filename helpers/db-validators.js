const Role = require('../models/role');
const User = require('../models/user');

const isValidRole = async (role = '') => {
    const foundRole = await Role.findOne({ role });
    if (!foundRole) {
        throw new Error(`Role ${role} is invalid`)
    }
}

const emailExists = async (email = '') => {
    const foundUser = await User.findOne({ email });
    if (foundUser) {
        throw new Error('Email has been already registered')
    }
}

const userExists = async (id = '') => {
    const foundUser = await User.findById(id);
    if (!foundUser) {
        throw new Error(`User ${id} is invalid`)
    }
}

module.exports = {
    emailExists,
    isValidRole,
    userExists
}