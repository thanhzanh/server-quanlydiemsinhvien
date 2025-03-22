const accountRoute = require('./account.route');
const teacherRoute = require('./teacher.route');
const classSubjectRoute = require('./classSubject.route');

module.exports = (app) => {


    app.use('/api/login', accountRoute);

    app.use('/api/gv', teacherRoute);

    app.use('/api/class-subject', classSubjectRoute);

};