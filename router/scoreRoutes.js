const express = require("express");
const router = express.Router();
const scoreController = require("../controllers/scoreController");
const { authenticateUser, authorizeRole } = require("../middleware/authMiddleware");

// PĐT nhập điểm
router.post("/scores", authenticateUser, authorizeRole("PDT"), scoreController.addScore);

// GV và PĐT xem điểm của sinh viên theo môn mình dạy
router.get("/scores", authenticateUser, authorizeRole("PDT", "GV"), scoreController.getAllScores);

// Sinh viên chỉ được xem điểm của chính mình
router.get("/scores/:id", authenticateUser, scoreController.getStudentScore);

module.exports = router;