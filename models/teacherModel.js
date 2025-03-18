// models/teacherModel.js
const pool = require('../config/db');

module.exports = {
  // Lấy danh sách giảng viên
  getAll: async () => {
    const sql = 'SELECT * FROM giang_vien';
    const [results] = await pool.query(sql);
    return results;
  },

  // Lấy thông tin giảng viên theo mã giảng viên (ma_gv)
  getById: async (ma_gv) => {
    const sql = 'SELECT * FROM giang_vien WHERE ma_gv = ?';
    const [results] = await pool.query(sql, [ma_gv]);
    return results[0]; // Vì mã giảng viên là duy nhất nên chỉ trả về đối tượng đầu tiên
  },

  // Tạo mới giảng viên
  create: async (data) => {
    const { ma_gv, ho_ten, email, ma_bo_mon } = data;
    const sql = `
      INSERT INTO giang_vien (ma_gv, ho_ten, email, ma_bo_mon)
      VALUES (?, ?, ?, ?)
    `;
    const [result] = await pool.query(sql, [ma_gv, ho_ten, email, ma_bo_mon]);
    return { ma_gv, ...data };
  },

  // Cập nhật thông tin giảng viên
  update: async (ma_gv, data) => {
    const { ho_ten, email, ma_bo_mon } = data;
    const sql = `
      UPDATE giang_vien
      SET ho_ten = ?, email = ?, ma_bo_mon = ?
      WHERE ma_gv = ?
    `;
    const [result] = await pool.query(sql, [ho_ten, email, ma_bo_mon, ma_gv]);
    return result.affectedRows;
  },

  // Xóa giảng viên
  delete: async (ma_gv) => {
    const sql = 'DELETE FROM giang_vien WHERE ma_gv = ?';
    const [result] = await pool.query(sql, [ma_gv]);
    return result.affectedRows;
  }
};
