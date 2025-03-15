// routes/teacherRoutes.js
const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');

// Lấy danh sách giảng viên
router.get('/teachers', teacherController.getAllTeachers);

// Lấy 1 giảng viên theo ma_gv
router.get('/teachers/:ma_gv', teacherController.getTeacherById);

// Tạo mới giảng viên
router.post('/teachers', teacherController.createTeacher);

// Cập nhật thông tin giảng viên
router.put('/teachers/:ma_gv', teacherController.updateTeacher);

// Xóa giảng viên
router.delete('/teachers/:ma_gv', teacherController.deleteTeacher);

module.exports = router;
