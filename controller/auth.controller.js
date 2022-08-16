const bcryptjs = require("bcryptjs");
const { response } = require("express");
const { generateJWT } = require("../helpers/generate-jwt");
const { googleVerify } = require("../helpers/google-verify");
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

        const token = await generateJWT(user.id);

        return res.status(200).json({
            msg: 'Login ok',
            user,
            token
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Contact to your administrator"
        })
    }

}

const googleSignIn = async (req, res = response) => {

    const { id_token } = req.body;

    try {

        const { email, name, picture } = await googleVerify(id_token);

        let user = await User.findOne({ email });

        if (!user) {
            const data = {
                email,
                name,
                role: 'admin',
                google: true,
                password: "-"
            }

            user = new User(data);
            await user.save();
        }

        if (!user.status) {
            return res.status(401).json({
                msg: "User is now disabled"
            })
        }

        const token = await generateJWT(user.id);

        return res.status(200).json({
            msg: 'Google signed in!',
            token,
            user
        });

    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: "Google token was not able to be verified"
        })
    }


}

module.exports = {
    login,
    googleSignIn
}
