// controllers/teacherController.js
const teacherModel = require('../models/teacherModel');

module.exports = {
  // Lấy danh sách giảng viên
  getAllTeachers: (req, res) => {
    teacherModel.getAll((err, teachers) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(teachers);
    });
  },

  // Lấy thông tin 1 giảng viên theo ma_gv
  getTeacherById: (req, res) => {
    const ma_gv = req.params.ma_gv;
    teacherModel.getById(ma_gv, (err, teacher) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!teacher) return res.status(404).json({ message: 'Không tìm thấy giảng viên' });
      res.json(teacher);
    });
  },

  // Tạo mới giảng viên
  createTeacher: (req, res) => {
    teacherModel.create(req.body, (err, newTeacher) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json(newTeacher);
    });
  },

  // Cập nhật thông tin giảng viên
  updateTeacher: (req, res) => {
    const ma_gv = req.params.ma_gv;
    teacherModel.update(ma_gv, req.body, (err, affectedRows) => {
      if (err) return res.status(500).json({ error: err.message });
      if (affectedRows === 0) return res.status(404).json({ message: 'Không tìm thấy giảng viên' });
      res.json({ message: 'Cập nhật giảng viên thành công' });
    });
  },

  // Xóa giảng viên
  deleteTeacher: (req, res) => {
    const ma_gv = req.params.ma_gv;
    teacherModel.delete(ma_gv, (err, affectedRows) => {
      if (err) return res.status(500).json({ error: err.message });
      if (affectedRows === 0) return res.status(404).json({ message: 'Không tìm thấy giảng viên' });
      res.json({ message: 'Xóa giảng viên thành công' });
    });
  }
};
