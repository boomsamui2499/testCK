
const jwt = require('jsonwebtoken');
const accessTokenSecret = 'SuperSecRetKey';
module.exports = function isAuth(req, res, next) {
    const headerAuth = req.headers.authorization;
    if (headerAuth) {
        const token = headerAuth.split(' ')[1];
        jwt.verify(token, accessTokenSecret, (err, result) => {
            if (err) {
                return res.sendStatus(403);
            }
            if (result) {
                req.token = result.token;

                next();
            } else {
                res.sendStatus(401);
            }

        });
    } else {
        res.sendStatus(401);
    }
};
