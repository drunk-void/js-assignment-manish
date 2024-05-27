const NewsController = require('../controllers/news');

module.exports = function(app) {
    app.route('/createNews').post(async (req, res, next) => {
        try {
            return res.json(await NewsController.createNews(req.query));
        } catch (err) {
            return next(err);
        }
    })

    app.route('/news').get(async (req, res, next) => {
        try {
            return res.json(await NewsController.getNews(req.query));
        } catch (err) {
            return next(err);
        }
    })
}