// controllers/studentController.js
const studentModel = require('../models/studentModel');

module.exports = {
  // Lấy danh sách sinh viên
  getAllStudents: (req, res) => {
    studentModel.getAll((err, students) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(students);
    });
  },

  // Lấy thông tin 1 sinh viên theo id
  getStudentById: (req, res) => {
    const id = parseInt(req.params.id);
    studentModel.getById(id, (err, student) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!student) return res.status(404).json({ message: 'Không tìm thấy sinh viên' });
      res.json(student);
    });
  },

  // Tạo mới sinh viên
  createStudent: (req, res) => {
    studentModel.create(req.body, (err, newStudent) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json(newStudent);
    });
  },

  // Cập nhật sinh viên
  updateStudent: (req, res) => {
    const id = parseInt(req.params.id);
    studentModel.update(id, req.body, (err, affectedRows) => {
      if (err) return res.status(500).json({ error: err.message });
      if (affectedRows === 0) {
        return res.status(404).json({ message: 'Không tìm thấy sinh viên' });
      }
      res.json({ message: 'Cập nhật sinh viên thành công' });
    });
  },

  // Xóa sinh viên
  deleteStudent: (req, res) => {
    const id = parseInt(req.params.id);
    studentModel.delete(id, (err, affectedRows) => {
      if (err) return res.status(500).json({ error: err.message });
      if (affectedRows === 0) {
        return res.status(404).json({ message: 'Không tìm thấy sinh viên' });
      }
      res.json({ message: 'Xóa sinh viên thành công' });
    });
  }
};
