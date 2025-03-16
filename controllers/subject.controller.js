const Subject = require('../models/subject.model');

module.exports.getAllSubjects = async (req, res) => {
    try {
        const subjects = await Subject.getAllSubjects();
        res.json({
            data: subjects
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};