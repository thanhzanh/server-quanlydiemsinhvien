// models/subjectModel.js
const pool = require('../config/db');

module.exports = {
  // Lấy danh sách môn học
  getAll: (callback) => {
    const sql = 'SELECT * FROM mon_hoc';
    pool.query(sql, (err, results) => {
      if (err) return callback(err, null);
      callback(null, results);
    });
  },

  // Lấy môn học theo mã môn học (ma_mh)
  getById: (ma_mh, callback) => {
    const sql = 'SELECT * FROM mon_hoc WHERE ma_mh = ?';
    pool.query(sql, [ma_mh], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results[0]); // Lấy phần tử đầu tiên
    });
  },

  // Thêm mới môn học
  create: (data, callback) => {
    const { ma_mh, ten_mon, so_tin_chi, ma_bo_mon } = data;
    const sql = `
      INSERT INTO mon_hoc (ma_mh, ten_mon, so_tin_chi, ma_bo_mon)
      VALUES (?, ?, ?, ?)
    `;
    pool.query(sql, [ma_mh, ten_mon, so_tin_chi, ma_bo_mon], (err, result) => {
      if (err) return callback(err, null);
      callback(null, { ma_mh, ...data });
    });
  },

  // Cập nhật thông tin môn học
  update: (ma_mh, data, callback) => {
    const { ten_mon, so_tin_chi, ma_bo_mon } = data;
    const sql = `
      UPDATE mon_hoc
      SET ten_mon = ?, so_tin_chi = ?, ma_bo_mon = ?
      WHERE ma_mh = ?
    `;
    pool.query(sql, [ten_mon, so_tin_chi, ma_bo_mon, ma_mh], (err, result) => {
      if (err) return callback(err, null);
      callback(null, result.affectedRows);
    });
  },

  // Xóa môn học
  delete: (ma_mh, callback) => {
    const sql = 'DELETE FROM mon_hoc WHERE ma_mh = ?';
    pool.query(sql, [ma_mh], (err, result) => {
      if (err) return callback(err, null);
      callback(null, result.affectedRows);
    });
  }
};
