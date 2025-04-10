const express = require("express");
const router = express.Router();
const { authenticateUser, authorizeRole } = require("../middleware/authMiddleware");
const userController = require("../controllers/userController");

// Lấy danh sách tài khoản 
router.get("/", authenticateUser, authorizeRole("PDT"), userController.getAlluser);

router.get("/:id", authenticateUser, authorizeRole("PDT"), userController.getUserById);

router.put("/:id", authenticateUser, authorizeRole("PDT"), userController.updateUser);

router.delete("/:id", authenticateUser, authorizeRole("PDT"), userController.deleteUser);

module.exports = router;

