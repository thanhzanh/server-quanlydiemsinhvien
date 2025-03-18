const express = require("express");
const router = express.Router();
const subjectController = require("../controllers/subjectController");
const { authenticateUser, authorizeRole } = require("../middleware/authMiddleware");

// Lấy danh sách môn học - GV và PĐT có thể xem
router.get("/", authenticateUser, authorizeRole("PDT", "GV"), subjectController.getAllSubjects);

// Lấy thông tin môn học
router.get("/:id", authenticateUser, subjectController.getSubjectById);

module.exports = router;
