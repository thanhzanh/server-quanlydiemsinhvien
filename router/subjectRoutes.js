const express = require("express");
const router = express.Router();
const subjectController = require("../controllers/subjectController");
const { authenticateUser, authorizeRole } = require("../middleware/authMiddleware");

// Lấy danh sách môn học - GV và PĐT có thể xem
router.get("/", authenticateUser, authorizeRole("PDT", "GV"), subjectController.getAllSubjects);

// Lấy thông tin môn học
router.get("/:ma_mh", authenticateUser, authorizeRole("PDT", "GV"), subjectController.getSubjectById);

// Thêm môn học
router.post("/", authenticateUser, authorizeRole("PDT"), subjectController.createSubject);

// Cập nhậ môn học
router.put("/:ma_mh", authenticateUser, authorizeRole("PDT"), subjectController.updateSubject);

// Xóa môn học
router.delete("/:ma_mh", authenticateUser, authorizeRole("PDT"), subjectController.deleteSubject);

module.exports = router;
