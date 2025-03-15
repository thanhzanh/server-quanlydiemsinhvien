// routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Trang chủ (tùy chọn)
router.get('/', (req, res) => {
  res.send('Trang chủ Quản lý Sinh viên');
});

// Lấy danh sách sinh viên
router.get('/students', studentController.getAllStudents);

// Lấy 1 sinh viên
router.get('/students/:id', studentController.getStudentById);

// Tạo mới sinh viên
router.post('/students', studentController.createStudent);

// Cập nhật sinh viên
router.put('/students/:id', studentController.updateStudent);

// Xóa sinh viên
router.delete('/students/:id', studentController.deleteStudent);

module.exports = router;
