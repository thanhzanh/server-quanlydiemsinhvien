// routes/subjectRoutes.js
const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subjectController');

// Lấy danh sách môn học
router.get('/subjects', subjectController.getAllSubjects);

// Lấy 1 môn học theo ma_mh
router.get('/subjects/:ma_mh', subjectController.getSubjectById);

// Tạo mới môn học
router.post('/subjects', subjectController.createSubject);

// Cập nhật thông tin môn học
router.put('/subjects/:ma_mh', subjectController.updateSubject);

// Xóa môn học
router.delete('/subjects/:ma_mh', subjectController.deleteSubject);

module.exports = router;
