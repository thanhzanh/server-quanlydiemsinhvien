// routes/scoreRoutes.js
const express = require("express");
const router = express.Router();
const scoreController = require("../controllers/scoreController");
const { authenticateUser, authorizeRole } = require("../middleware/authMiddleware");

// Lấy tất cả điểm (GV & PĐT)
router.get(
  "/",
  authenticateUser,
  authorizeRole(["PDT", "GV"]),
  scoreController.getAllScores
);

// lấy điểm của sinh viên (chỉ SV xem của mình)
router.get(
  "/:ma_sv",
  authenticateUser,
  scoreController.getStudentScore
);

// Lấy điểm theo lớp môn học (GV & PĐT)
router.get(
  "/class/:ma_lop_mh",
  authenticateUser,
  authorizeRole(["PDT", "GV"]),
  scoreController.getScoresByCourseClass
);

// Thêm điểm (chỉ PĐT)
router.post(
  "/",
  authenticateUser,
  authorizeRole(["PDT"]),
  scoreController.addScore
);

// Thêm điểm theo lớp môn học
router.post(
  "/create/:ma_lop_mh",
  authenticateUser,
  authorizeRole(["PDT"]),
  scoreController.bulkInsertByClass
);

// Cập nhật điểm cho nhiều sinh viên trong lớp môn học
router.put(
  "/class/:ma_lop_mh",
  authenticateUser,
  authorizeRole(["PDT"]),
  scoreController.updateScoresByClass
);

//  Cập nhật điểm (chỉ PĐT)
router.put(
  "/:id",
  authenticateUser,
  authorizeRole(["PDT"]),
  scoreController.updateScore
);

//  Xóa điểm (chỉ PĐT)
router.delete(
  "/:id",
  authenticateUser,
  authorizeRole(["PDT"]),
  scoreController.deleteScore
);

module.exports = router;