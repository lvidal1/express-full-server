const bcryptjs = require("bcryptjs");
const { response } = require("express");
const User = require("../models/user");

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                msg: 'Invalid credentials - email'
            })
        }

        const verifyPassword = bcryptjs.compareSync(password, user.password);

        if (!verifyPassword) {
            return res.status(400).json({
                msg: 'Invalid credentials - wrong password'
            })
        }

        if (!user.status) {
            return res.status(400).json({
                msg: 'User has been disabled'
            })
        }

        return res.status(200).json({
            msg: 'Login ok'
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Contact to your administrator"
        })
    }

}

module.exports = {
    login
}
