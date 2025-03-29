const express = require('express');
const router = express.Router();

const controller = require('../controllers/classSubjectController');
const { authenticateUser, authorizeRole } = require("../middleware/authMiddleware");

// API dành cho Phòng Đào Tạo quản lý lớp môn học

// Lấy danh sách tất cả lớp môn học (PĐT có quyền)
router.get("/", authenticateUser, authorizeRole(["PDT"]), controller.getAllLopMonHoc);

// Lấy thông tin lớp môn học theo mã lớp môn học (PĐT có quyền)
router.get("/:ma_lop_mh", authenticateUser, authorizeRole(["PDT"]), controller.getLopMonHocById);

// Tạo lớp môn học mới (Chỉ PĐT có quyền)
router.post("/create", authenticateUser, authorizeRole(["PDT"]), controller.createMonHoc);

// Cập nhật thông tin lớp môn học (Chỉ PĐT có quyền)
router.put("/update/:ma_lop_mh", authenticateUser, authorizeRole(["PDT"]), controller.updateMonHoc);

// Xóa lớp môn học (Chỉ PĐT có quyền)
router.delete("/delete/:ma_lop_mh", authenticateUser, authorizeRole(["PDT"]), controller.deleteMonHoc);

module.exports = router;