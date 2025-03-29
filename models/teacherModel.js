// models/teacherModel.js
const pool = require("../config/db");

module.exports = {
  // Lấy danh sách giảng viên
  getAll: async () => {
    const sql = "SELECT * FROM giang_vien";
    const [results] = await pool.query(sql);
    return results;
  },

  // Lấy thông tin giảng viên theo mã giảng viên (ma_gv)
  getById: async (ma_gv) => {
    const sql = "SELECT * FROM giang_vien WHERE ma_gv = ?";
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
    const sql = "DELETE FROM giang_vien WHERE ma_gv = ?";
    const [result] = await pool.query(sql, [ma_gv]);
    return result.affectedRows;
  },

  // Lấy danh sách môn học, lớp mà giáo viên đó dạy
  getDSLopMonHocByGiaoVien: async (ma_gv) => {
    const [rows] = await pool.query(
      `SELECT DISTINCT  lmh.ma_lop_mh, mh.ma_mh, mh.ten_mon, lmh.hoc_ky, lmh.nam_hoc
        FROM lop_mon_hoc lmh
        JOIN mon_hoc mh ON lmh.ma_mh = mh.ma_mh
        WHERE lmh.ma_gv = ?`,
      [ma_gv]
    );

    return rows;
  },

  // Lấy danh sách sinh viên trong từng lớp môn học mà giáo viên đó dạy
  getStudentsByClass: async (ma_gv, ma_lop_mh) => {
    const [rows] = await pool.query(
      `SELECT sv.ma_sv, sv.ho_ten, sv.email, sv.ma_lop, 
              lmh.ma_lop_mh, mh.ten_mon
       FROM sinh_vien_lop_mh svlmh
       JOIN sinh_vien sv ON svlmh.ma_sv = sv.ma_sv
       JOIN lop_mon_hoc lmh ON svlmh.ma_lop_mh = lmh.ma_lop_mh
       JOIN mon_hoc mh ON lmh.ma_mh = mh.ma_mh
       WHERE lmh.ma_gv = ? AND lmh.ma_lop_mh = ?`,
      [ma_gv, ma_lop_mh]
    );

    return rows;
  },

  // Lấy điểm sinh viên trong lớp môn học mà giáo viên đó dạy
  getStudentScoresByClass: async (ma_gv, ma_lop_mh) => {
    const [rows] = await pool.query(
      `SELECT sv.ma_sv, sv.ho_ten, sv.email, lmh.ma_lop_mh, d.diem_cc, d.diem_gk, d.diem_ck
       FROM diem d
       JOIN sinh_vien sv ON d.ma_sv = sv.ma_sv
       JOIN lop_mon_hoc lmh ON d.ma_lop_mh = lmh.ma_lop_mh
       WHERE lmh.ma_gv = ? AND lmh.ma_lop_mh = ?`,
      [ma_gv, ma_lop_mh]
    );

    return rows;
  },
};
