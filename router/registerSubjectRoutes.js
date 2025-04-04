const express = require("express");
const { getRegistrations, createRegistration, updateRegistration, deleteRegistration, getSubjectsByDepartment } = require("../controllers/registerSubjectController");
const router = express.Router();
const { authenticateUser, authorizeRole } = require("../middleware/authMiddleware");

// Lấy danh sách đăng ký môn học của sinh viên
router.get("/:ma_sv", authenticateUser, authorizeRole(["SV"]), getRegistrations);
// Thêm đăng ký môn học
router.post("/", authenticateUser, authorizeRole(["SV"]), createRegistration);
// Sửa đăng ký môn học
router.put("/:ma_sv/:ma_lop_mh", authenticateUser, authorizeRole(["SV"]), updateRegistration);
// Xóa đăng ký môn học
router.delete("/:ma_sv/:ma_lop_mh", authenticateUser, authorizeRole(["SV"]), deleteRegistration);

router.get("/mon-hoc/:ma_bo_mon", authenticateUser, getSubjectsByDepartment);

module.exports = router;