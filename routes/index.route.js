const subjectRoute = require('./subject.route');

module.exports = (app) => {

    app.use('/api/subjects', subjectRoute);
};