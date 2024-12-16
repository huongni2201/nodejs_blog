const Course = require('../models/Course');

class MeController {
    // [GET] /me/stored/courses
    storedCourses(req, res, next) {
        Promise.all([
            Course.find({}).lean(),
            Course.countDocumentsWithDeleted({ deleted: true }),
        ])
            .then(([courses, deletedCourse]) => {
                res.render('me/stored-courses', { courses, deletedCourse });
            })
            .catch(next);
    }

    // [GET] /me/trash/courses
    trashCourses(req, res, next) {
        Course.findWithDeleted({ deleted: true }) // Chỉ lấy tài liệu thực sự bị xóa
            .lean()
            .then((courses) => {
                res.render('me/trash-courses', { courses });
            })
            .catch(next);
    }
}

module.exports = new MeController();
