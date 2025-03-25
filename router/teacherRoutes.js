const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacherController");
const { authenticateUser, authorizeRole } = require("../middleware/authMiddleware");

// Lấy danh sách giảng viên - Chỉ PĐT có quyền xem
router.get("/", authenticateUser, authorizeRole("PDT"), teacherController.getAllTeachers);

// Lấy thông tin giảng viên - GV và PĐT được xem
router.get("/:id", authenticateUser, authorizeRole("PDT", "GV"), teacherController.getTeacherById);

// Lấy danh sách lớp môn học - GV
router.get("/:ma_gv/lop-mon-hoc", authenticateUser, authorizeRole("GV"), teacherController.getDSLopMonHoc);

// Lấy danh sách sinh viên của lớp môn học - GV
router.get("/:ma_gv/lop-mon-hoc/:ma_lop_mh/sinh-vien", authenticateUser, authorizeRole("GV"), teacherController.getDSSVByLopMonHoc);

// Lấy danh sách điểm của sinh viên lớp môn học - GV
router.get("/:ma_gv/lop-mon-hoc/:ma_lop_mh/diem", authenticateUser, authorizeRole("GV"),  teacherController.getDiemSVLopMonHoc);  

module.exports = router;
