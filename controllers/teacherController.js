// controllers/teacherController.js
const teacherModel = require('../models/teacherModel');

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
      if (!teacher) return res.status(404).json({ message: 'Không tìm thấy giảng viên' });
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
      if (affectedRows === 0) return res.status(404).json({ message: 'Không tìm thấy giảng viên' });
      res.json({ message: 'Cập nhật giảng viên thành công' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Xóa giảng viên
  deleteTeacher: async (req, res) => {
    const ma_gv = req.params.ma_gv;
    try {
      const affectedRows = await teacherModel.delete(ma_gv);
      if (affectedRows === 0) return res.status(404).json({ message: 'Không tìm thấy giảng viên' });
      res.json({ message: 'Xóa giảng viên thành công' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
