const database = require('../config/database');

// Đăng nhập bằng mssv & năm sinh(ngay_sinh)
const login = async (ma_sv, password) => {
    try {
        const [rows] = await database.query("SELECT ma_sv, ho_ten, password, role FROM sinh_vien WHERE ma_sv = ?", [ma_sv]);
        if (rows.length === 0) return null; // Không tìm thấy sinh viên
        return rows[0]; // trả vè thông tin sinh viên
    } catch (error) {
        console.error("Lỗi truy vấn", error);
        throw error;
    }
};

module.exports = { login };
