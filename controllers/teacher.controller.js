const Teacher = require('../models/teacher.model');

// Lấy danh sách lớp môn học của giảng viên dạy
module.exports.getDSLopMonHoc = async (req, res) => {
    try {
        const ma_gv = req.params.ma_gv;        

        if (!ma_gv) {
            return res.status(400).json({
                message: "Thiếu mã giáo viên"
            });
        }

        const subjects = await Teacher.getDSLopMonHocByGiaoVien(ma_gv);

        if (subjects.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Giáo viên không dạy môn nào"
            });
        }

        return res.status(200).json({
            success: true,
            data: subjects
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Lấy danh sách sinh viên theo từng lớp môn học của giảng viên dạy
module.exports.getDSSVByLopMonHoc = async (req, res) => {
    try {
        const { ma_gv, ma_lop_mh } = req.params;        

        if (!ma_lop_mh || !ma_lop_mh) {
            return res.status(400).json({
                message: "Thiếu mã lớp môn học hoặc mã giáo viên"
            });
        }

        const students = await Teacher.getStudentsByClass(ma_gv, ma_lop_mh);

        if (students.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Không có sinh viên trong lớp môn học này"
            });
        }

        return res.status(200).json({
            success: true,
            data: students
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Lấy điểm sinh viên theo từng lớp môn học của giảng viên dạy
module.exports.getDiemSVLopMonHoc = async (req, res) => {
    try {
        const { ma_gv, ma_lop_mh } = req.params;        

        if (!ma_lop_mh || !ma_lop_mh) {
            return res.status(400).json({
                message: "Thiếu mã lớp môn học hoặc mã giáo viên"
            });
        }

        const scores = await Teacher.getStudentScoresByClass(ma_gv, ma_lop_mh);

        if (scores.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Không có điểm của sinh viên trong lớp môn học này"
            });
        }

        return res.status(200).json({
            success: true,
            data: scores
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
