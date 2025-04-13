const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const { authenticateUser, authorizeRole } = require("../middleware/authMiddleware");

// Lấy danh sách sinh viên (PĐT và giảng viên có quyền)
router.get("/", authenticateUser, authorizeRole("PDT", "GV"), studentController.getAllStudents);

// Lấy thông tin một sinh viên (Sinh viên chỉ xem được thông tin của mình)
router.get("/:ma_sv", authenticateUser, studentController.getStudentById);

// Thêm sinh viên (Chỉ PĐT)
router.post("/", authenticateUser, authorizeRole("PDT"), studentController.createStudent);

// Cập nhật thông tin sinh viên (Chỉ PĐT)
router.put("/:id", authenticateUser, authorizeRole("PDT"), studentController.updateStudent);

// Xóa sinh viên (Chỉ PĐT)
router.delete("/:id", authenticateUser, authorizeRole("PDT"), studentController.deleteStudent);

// Xem diem sinh viên 
router.delete("/:id", authenticateUser, authorizeRole("PDT"), studentController.deleteStudent); 

module.exports = router;
