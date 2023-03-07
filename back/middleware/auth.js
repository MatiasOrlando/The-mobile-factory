const { validateToken } = require("../config/tokens");

function validateUser(req, res, next) {
    let cookie = req.cookies.token;
    let { payload } = validateToken(cookie);
    req.user = payload;
    if (payload) return next();
    res.sendStatus(401);
}

module.exports = { validateUser };
