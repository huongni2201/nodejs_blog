


class NewsController {

    // [GET] /news
    index(req, res) {
        res.render('news');
    }

    show(req, res) {
        res.render('show')
    }
}


module.exports = new NewsController;