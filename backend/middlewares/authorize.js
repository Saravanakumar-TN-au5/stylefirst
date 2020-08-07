const authorize = (req, res, next) => {
    if (req.session.user || (req.path === '/register' || req.path === '/login')) {
        next();
    } else {
        res.status(401).send({message: 'Unauthorized access'});
    }
}

module.exports = authorize;