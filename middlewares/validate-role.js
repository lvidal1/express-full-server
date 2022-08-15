const { request, response } = require("express")

const isAdminRole = (req = request, res = response, next) => {

    if (!req.user) {
        return res.status(500).json({
            msg: "Invalid user validation for role check"
        });
    }

    const { role, email } = req.user;

    if (role !== 'admin') {
        return res.status(401).json({
            msg: `${email} has not enough permission to perform this action`
        })
    }

    next();
}

const hasRole = (...roles) => {
    return (req, res = response, next) => {

        if (!req.user) {
            return res.status(500).json({
                msg: "Invalid user validation for role check"
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(500).json({
                msg: "The service require a higher role permission"
            });
        }

        next();
    }
}

module.exports = {
    isAdminRole,
    hasRole
}