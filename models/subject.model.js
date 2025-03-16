const database = require('../config/database');

// Lấy ra danh sách môn học
const getAllSubjects = async() => {
    const [rows] = await database.query("SELECT * FROM mon_hoc");
    return rows;
}

module.exports = { getAllSubjects };
