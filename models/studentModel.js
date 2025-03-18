// models/studentModel.js
const pool = require('../config/db');

module.exports = {
  // Lấy tất cả sinh viên
  getAll: (callback) => {
    const sql = 'SELECT * FROM sinh_vien';
    pool.query(sql, (err, results) => {
      if (err) return callback(err, null);
      callback(null, results);
    });
  },

  // Lấy sinh viên theo ID (cột id trong bảng)
  getById: (id, callback) => {
    const sql = 'SELECT * FROM sinh_vien WHERE id = ?';
    pool.query(sql, [id], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results[0]); 
    });
  },

  // Thêm mới sinh viên
  create: (data, callback) => {
    const { ma_sv, ho_ten, ngay_sinh, gioi_tinh, email, ma_lop } = data;
    const sql = `
      INSERT INTO sinh_vien (ma_sv, ho_ten, ngay_sinh, gioi_tinh, email, ma_lop)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    pool.query(sql, [ma_sv, ho_ten, ngay_sinh, gioi_tinh, email, ma_lop], (err, result) => {
      if (err) return callback(err, null);
      callback(null, { id: result.insertId, ...data });
    });
  },

  // Cập nhật sinh viên
  update: (id, data, callback) => {
    const { ma_sv, ho_ten, ngay_sinh, gioi_tinh, email, ma_lop } = data;
    const sql = `
      UPDATE sinh_vien
      SET ma_sv = ?, ho_ten = ?, ngay_sinh = ?, gioi_tinh = ?, email = ?, ma_lop = ?
      WHERE id = ?
    `;
    pool.query(sql, [ma_sv, ho_ten, ngay_sinh, gioi_tinh, email, ma_lop, id], (err, result) => {
      if (err) return callback(err, null);
      callback(null, result.affectedRows); 
    });
  },

  // Xóa sinh viên
  delete: (id, callback) => {
    const sql = 'DELETE FROM sinh_vien WHERE id = ?';
    pool.query(sql, [id], (err, result) => {
      if (err) return callback(err, null);
      callback(null, result.affectedRows);
    });
  }
};
