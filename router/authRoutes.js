const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const authController = require("../controllers/authController");
const { authenticateUser } = require("../middleware/authMiddleware");

// Route đăng ký người dùng (Thêm kiểm tra dữ liệu đầu vào)
router.post(
    "/register",
    [
        body("username").notEmpty().withMessage("Tên đăng nhập không được để trống"),
        body("password").isLength({ min: 6 }).withMessage("Mật khẩu phải có ít nhất 6 ký tự"),
        body("role").notEmpty().withMessage("Vai trò không được để trống"),
    ],
    authController.register
);

// Route đăng nhập
router.post(
    "/login",
    [
        body("username").notEmpty().withMessage("Tên đăng nhập không được để trống"),
        body("password").notEmpty().withMessage("Mật khẩu không được để trống"),
    ],
    authController.login
);

// Route lấy thông tin người dùng từ token (Yêu cầu xác thực)
router.get("/profile", authenticateUser, authController.getUserProfile);

module.exports = router;
