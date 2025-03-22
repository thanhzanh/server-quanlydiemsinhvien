const Student = require('../models/student.model');
const jwt = require("jsonwebtoken");

// [POST] /api/login
module.exports.login = async (req, res) => {
    const { ma_sv, password } = req.body;

    if (!ma_sv || !password) {
        return res.status(400).json({
            mesage: "Vui lòng nhập ma_sv và password"
        });
    }

    // Kiểm tra 
    const student = await Student.login(ma_sv, password);

    if (!student) {
        return res.status(401).json({
            mesage: "Sinh viên không tồn tại"
        });
    }

    // Kiểm tra password
    if (student.password !== password) {
        return res.status(401).json({
            mesage: "Sai mật khẩu"
        });
    }

    // Tạo token JWT
    const token = jwt.sign(
        { mssv: student.ma_sv, role: student.role },
        process.env.JWT_SECRET, 
        { expiresIn: "1h" }
    );

    // Lưu vào cookie
    res.cookie("token", token);

    res.json({
        mesage: "Đăng nhập thành công",
        token,
        user: {
            ma_sv: ma_sv,
            ho_ten: student.ho_ten,
            role: student.role
        }
    }); 
};
