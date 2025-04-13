// models/studentModel.js
const pool = require('../config/db');

module.exports = {
  // Lấy tất cả sinh viên
  getAll: async () => {
    try {
      // const [rows] = await pool.query("SELECT * FROM sinh_vien"); // Sử dụng await
      const [rows] = await pool.query(`
        SELECT id, ma_sv, ho_ten, 
               DATE_FORMAT(ngay_sinh, '%d/%m/%Y') AS ngay_sinh, 
               gioi_tinh, email, ma_lop 
        FROM sinh_vien
      `);
      return rows;
    } catch (error) {
      throw error;
    }
  },

  // Lấy sinh viên theo ID (cột id trong bảng)
  getById: async (ma_sv) => {
    const [rows] = await pool.query("SELECT * FROM sinh_vien WHERE ma_sv = ?", [ma_sv]);
    return rows[0];
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
  },

  // Xem diem sinh vien
  getGradesById: async (ma_sv) => {
    try {
      const [diemRows] = await db.execute(
        "SELECT ma_lop_mh, diem_cc, diem_gk, diem_ck FROM diem WHERE ma_sv = ?",
        [ma_sv]
      );
      if (!diemRows || diemRows.length === 0) {
        return [];
      }

      const grades = [];
      for (const diem of diemRows) {
        const [lopRows] = await db.execute(
          "SELECT hoc_ky, nam_hoc, ma_mh, ma_gv FROM lop_mon_hoc WHERE ma_lop_mh = ?",
          [diem.ma_lop_mh]
        );
        if (!lopRows || lopRows.length === 0) {
          throw new Error(`Không tìm thấy lớp môn học cho ma_lop_mh: ${diem.ma_lop_mh}`);
        }
        const lop = lopRows[0];

        const [monHocRows] = await db.execute(
          "SELECT ma_mh, ten_mon AS ten_mon_hoc FROM mon_hoc WHERE ma_mh = ?",
          [lop.ma_mh]
        );
        if (!monHocRows || monHocRows.length === 0) {
          throw new Error(`Không tìm thấy môn học cho ma_mh: ${lop.ma_mh}`);
        }
        const monHoc = monHocRows[0];

        const [giangVienRows] = await db.execute(
          "SELECT ho_ten AS giang_vien FROM giang_vien WHERE ma_gv = ?",
          [lop.ma_gv]
        );
        if (!giangVienRows || giangVienRows.length === 0) {
          throw new Error(`Không tìm thấy giảng viên cho ma_gv: ${lop.ma_gv}`);
        }
        const giangVien = giangVienRows[0];

        grades.push({
          hoc_ky: lop.hoc_ky,
          nam_hoc: lop.nam_hoc,
          mon_hoc: monHoc.ma_mh,
          ten_mon_hoc: monHoc.ten_mon_hoc,
          diem_cc: diem.diem_cc,
          diem_gk: diem.diem_gk,
          diem_ck: diem.diem_ck,
          giang_vien: giangVien.giang_vien,
        });
      }

      return grades;
    } catch (error) {
      console.error("Error in getGradesById:", error.message);
      throw error;
    }
  }
};
