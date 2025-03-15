// models/teacherModel.js
const pool = require('../config/db');

module.exports = {
  // Lấy danh sách giảng viên
  getAll: (callback) => {
    const sql = 'SELECT * FROM giang_vien';
    pool.query(sql, (err, results) => {
      if (err) return callback(err, null);
      callback(null, results);
    });
  },

  // Lấy thông tin giảng viên theo mã giảng viên (ma_gv)
  getById: (ma_gv, callback) => {
    const sql = 'SELECT * FROM giang_vien WHERE ma_gv = ?';
    pool.query(sql, [ma_gv], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results[0]); // Vì mã giảng viên là duy nhất nên chỉ trả về đối tượng đầu tiên
    });
  },

  // Tạo mới giảng viên
  create: (data, callback) => {
    const { ma_gv, ho_ten, email, ma_bo_mon } = data;
    const sql = `
      INSERT INTO giang_vien (ma_gv, ho_ten, email, ma_bo_mon)
      VALUES (?, ?, ?, ?)
    `;
    pool.query(sql, [ma_gv, ho_ten, email, ma_bo_mon], (err, result) => {
      if (err) return callback(err, null);
      // Trả về đối tượng vừa thêm, sử dụng mã giảng viên do người dùng cung cấp
      callback(null, { ma_gv, ...data });
    });
  },

  // Cập nhật thông tin giảng viên
  update: (ma_gv, data, callback) => {
    const { ho_ten, email, ma_bo_mon } = data;
    const sql = `
      UPDATE giang_vien
      SET ho_ten = ?, email = ?, ma_bo_mon = ?
      WHERE ma_gv = ?
    `;
    pool.query(sql, [ho_ten, email, ma_bo_mon, ma_gv], (err, result) => {
      if (err) return callback(err, null);
      callback(null, result.affectedRows); // Số dòng bị ảnh hưởng
    });
  },

  // Xóa giảng viên
  delete: (ma_gv, callback) => {
    const sql = 'DELETE FROM giang_vien WHERE ma_gv = ?';
    pool.query(sql, [ma_gv], (err, result) => {
      if (err) return callback(err, null);
      callback(null, result.affectedRows);
    });
  }
};
