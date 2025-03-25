// models/studentModel.js
const pool = require('../config/db');

module.exports = {
  // Lấy tất cả sinh viên
  getAll: async () => {
    const sql = 'SELECT * FROM sinh_vien';
    const [results] = await pool.query(sql);
    return results;
  },

  // Lấy sinh viên theo ID (cột id trong bảng)
  getById: async (id) => {
    const sql = 'SELECT * FROM sinh_vien WHERE id = ?';
    const [results] = await pool.query(sql, [id]);
    return results[0];
  },

  // Thêm mới sinh viên
  create: async (data) => {
    const { ma_sv, ho_ten, ngay_sinh, gioi_tinh, email, ma_lop } = data;
    const sql = `
      INSERT INTO sinh_vien (ma_sv, ho_ten, ngay_sinh, gioi_tinh, email, ma_lop)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const [result] = await pool.query(sql, [ma_sv, ho_ten, ngay_sinh, gioi_tinh, email, ma_lop]);
    return { id: result.insertId, ...data };
  },

  // Cập nhật sinh viên
  update: async (id, data) => {
    const { ma_sv, ho_ten, ngay_sinh, gioi_tinh, email, ma_lop } = data;
    const sql = `
      UPDATE sinh_vien
      SET ma_sv = ?, ho_ten = ?, ngay_sinh = ?, gioi_tinh = ?, email = ?, ma_lop = ?
      WHERE id = ?
    `;
    const [result] = await pool.query(sql, [ma_sv, ho_ten, ngay_sinh, gioi_tinh, email, ma_lop, id]);
    return result.affectedRows;
  },

  // Xóa sinh viên
  delete: async (id) => {
    const sql = 'DELETE FROM sinh_vien WHERE id = ?';
    const [result] = await pool.query(sql, [id]);
    return result.affectedRows;
  }
};
