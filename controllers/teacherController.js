// controllers/teacherController.js
const teacherModel = require("../models/teacherModel");

module.exports = {
  // Lấy danh sách giảng viên
  getAllTeachers: async (req, res) => {
    try {
      const teachers = await teacherModel.getAll();
      res.json(teachers);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Lấy thông tin 1 giảng viên theo ma_gv
  getTeacherById: async (req, res) => {
    const ma_gv = req.params.ma_gv;
    try {
      const teacher = await teacherModel.getById(ma_gv);
      if (!teacher)
        return res.status(404).json({ message: "Không tìm thấy giảng viên" });
      res.json(teacher);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Tạo mới giảng viên
  createTeacher: async (req, res) => {
    try {
      const newTeacher = await teacherModel.create(req.body);
      res.status(201).json(newTeacher);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Cập nhật thông tin giảng viên
  updateTeacher: async (req, res) => {
    const ma_gv = req.params.ma_gv;
    try {
      const affectedRows = await teacherModel.update(ma_gv, req.body);
      if (affectedRows === 0)
        return res.status(404).json({ message: "Không tìm thấy giảng viên" });
      res.json({ message: "Cập nhật giảng viên thành công" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Xóa giảng viên
  deleteTeacher: async (req, res) => {
    const ma_gv = req.params.ma_gv;
    try {
      const affectedRows = await teacherModel.delete(ma_gv);
      if (affectedRows === 0)
        return res.status(404).json({ message: "Không tìm thấy giảng viên" });
      res.json({ message: "Xóa giảng viên thành công" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Lấy danh sách lớp môn học của giảng viên dạy
  getDSLopMonHoc: async (req, res) => {
    try {
      const ma_gv = req.params.ma_gv;

      // Kiểm tra nếu người dùng không phải GV hoặc không truy cập đúng mã GV của họ
      if (req.user.role !== "GV" || req.user.ma_gv !== ma_gv) {
        return res.status(403).json({
            success: false,
            message: "Bạn không có quyền truy cập thông tin này",
        });
    }

      if (!ma_gv) {
        return res.status(400).json({
          message: "Thiếu mã giáo viên",
        });
      }

      const subjects = await teacherModel.getDSLopMonHocByGiaoVien(ma_gv);

      if (subjects.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Giáo viên không dạy môn nào",
        });
      }

      return res.status(200).json({
        success: true,
        data: subjects,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Lấy danh sách sinh viên theo từng lớp môn học của giảng viên dạy
  getDSSVByLopMonHoc: async (req, res) => {
    try {
      const { ma_gv, ma_lop_mh } = req.params;

      // Kiểm tra quyền hạn
      if (req.user.role !== "GV" || req.user.ma_gv !== ma_gv) {
        return res.status(403).json({
            success: false,
            message: "Bạn không có quyền truy cập danh sách sinh viên lớp này",
        });
    }

      const students = await teacherModel.getStudentsByClass(ma_gv, ma_lop_mh);

      if (students.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Không có sinh viên trong lớp môn học này",
        });
      }

      return res.status(200).json({
        success: true,
        data: students,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Lấy điểm sinh viên theo từng lớp môn học của giảng viên dạy
  getDiemSVLopMonHoc: async (req, res) => {
    try {
      const { ma_gv, ma_lop_mh } = req.params;

      // Kiểm tra quyền hạn
      if (req.user.role !== "GV" || req.user.ma_gv !== ma_gv) {
        return res.status(403).json({
            success: false,
            message: "Bạn không có quyền xem điểm của lớp này",
        });
    }

      const scores = await teacherModel.getStudentScoresByClass(ma_gv, ma_lop_mh);

      if (scores.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Không có điểm của sinh viên trong lớp môn học này",
        });
      }

      return res.status(200).json({
        success: true,
        data: scores,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
