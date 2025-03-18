// controllers/studentController.js
const studentModel = require('../models/studentModel');

module.exports = {
  // Lấy danh sách sinh viên
  getAllStudents: async (req, res) => {
    try {
      const students = await studentModel.getAll();
      res.json(students);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Lấy thông tin 1 sinh viên theo id
  getStudentById: async (req, res) => {
    const id = parseInt(req.params.id);
    try {
      const student = await studentModel.getById(id);
      if (!student) return res.status(404).json({ message: 'Không tìm thấy sinh viên' });
      res.json(student);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Tạo mới sinh viên
  createStudent: async (req, res) => {
    try {
      const newStudent = await studentModel.create(req.body);
      res.status(201).json(newStudent);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Cập nhật sinh viên
  updateStudent: async (req, res) => {
    const id = parseInt(req.params.id);
    try {
      const affectedRows = await studentModel.update(id, req.body);
      if (affectedRows === 0) {
        return res.status(404).json({ message: 'Không tìm thấy sinh viên' });
      }
      res.json({ message: 'Cập nhật sinh viên thành công' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Xóa sinh viên
  deleteStudent: async (req, res) => {
    const id = parseInt(req.params.id);
    try {
      const affectedRows = await studentModel.delete(id);
      if (affectedRows === 0) {
        return res.status(404).json({ message: 'Không tìm thấy sinh viên' });
      }
      res.json({ message: 'Xóa sinh viên thành công' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
