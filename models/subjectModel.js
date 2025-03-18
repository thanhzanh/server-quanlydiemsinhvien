// models/subjectModel.js
const pool = require('../config/db');

module.exports = {
  // Lấy danh sách môn học
  getAll: async () => {
    const sql = 'SELECT * FROM mon_hoc';
    const [results] = await pool.query(sql);
    return results;
  },

  // Lấy môn học theo mã môn học (ma_mh)
  getById: async (ma_mh) => {
    const sql = 'SELECT * FROM mon_hoc WHERE ma_mh = ?';
    const [results] = await pool.query(sql, [ma_mh]);
    return results[0]; // Lấy phần tử đầu tiên
  },

  // Thêm mới môn học
  create: async (data) => {
    const { ma_mh, ten_mon, so_tin_chi, ma_bo_mon } = data;
    const sql = `
      INSERT INTO mon_hoc (ma_mh, ten_mon, so_tin_chi, ma_bo_mon)
      VALUES (?, ?, ?, ?)
    `;
    const [result] = await pool.query(sql, [ma_mh, ten_mon, so_tin_chi, ma_bo_mon]);
    return { ma_mh, ...data };
  },

  // Cập nhật thông tin môn học
  update: async (ma_mh, data) => {
    const { ten_mon, so_tin_chi, ma_bo_mon } = data;
    const sql = `
      UPDATE mon_hoc
      SET ten_mon = ?, so_tin_chi = ?, ma_bo_mon = ?
      WHERE ma_mh = ?
    `;
    const [result] = await pool.query(sql, [ten_mon, so_tin_chi, ma_bo_mon, ma_mh]);
    return result.affectedRows;
  },

  // Xóa môn học
  delete: async (ma_mh) => {
    const sql = 'DELETE FROM mon_hoc WHERE ma_mh = ?';
    const [result] = await pool.query(sql, [ma_mh]);
    return result.affectedRows;
  }
};
