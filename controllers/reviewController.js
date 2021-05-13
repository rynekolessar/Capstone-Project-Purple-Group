module.exports.setGameUserIds = (req, res, next) => {
    if (!req.body.game) req.body.game = req.params.game;
    if (!req.body.user) req.body.user = req.user.id;
    next();
};

module.exports.createReview = (req, res)