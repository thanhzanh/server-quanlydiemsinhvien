const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacherController");
const { authenticateUser, authorizeRole } = require("../middleware/authMiddleware");

// Lấy danh sách giảng viên - Chỉ PĐT có quyền xem
router.get("/", authenticateUser, authorizeRole("PDT"), teacherController.getAllTeachers);

// Lấy thông tin giảng viên - GV và PĐT được xem
router.get("/:id", authenticateUser, authorizeRole("PDT", "GV"), teacherController.getTeacherById);

module.exports = router;
