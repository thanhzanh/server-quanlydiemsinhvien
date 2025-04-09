const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY || "default_secret";

// Đăng ký tài khoản mới
exports.register = async (req, res) => {
    const { username, password, role, ma_gv, ma_sv } = req.body;

    if (!username || !password || !role) {
        return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin" });
    }

    try {
        // Kiểm tra tài khoản có tồn tại không
        const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [username]);
        if (rows.length > 0) return res.status(400).json({ message: "Username đã tồn tại!" });

        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);
        const roleNormalized = role.toLowerCase();

        await pool.query("INSERT INTO users (username, password, role, ma_gv, ma_sv) VALUES (?, ?, ?, ?, ?)", 
            [username, hashedPassword, role, ma_gv || null, ma_sv || null]);

        res.status(201).json({ message: "Tạo tài khoản thành công!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Đăng nhập
exports.login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Vui lòng nhập username và password" });
    }

    try {
        const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [username]);
        if (rows.length === 0) return res.status(401).json({ message: "Tài khoản không tồn tại" });

        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Sai mật khẩu" });

        const token = jwt.sign(
            { id: user.id, role: user.role, ma_gv: user.ma_gv, ma_sv: user.ma_sv, ho_ten: user.ho_ten },
            SECRET_KEY,
            { expiresIn: process.env.TOKEN_EXPIRE || "1h" }
        );

        res.json({ token, role: user.role, magv: user.ma_gv, masv: user.ma_sv});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Xác thực người dùng từ token
exports.getUserProfile = (req, res) => {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Không có token hợp lệ" });
    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        res.json({ user: decoded });
    } catch (err) {
        res.status(401).json({ message: "Token không hợp lệ" });
    }
};
