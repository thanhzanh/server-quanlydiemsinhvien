// models/scoreModel.js
const pool = require('../config/db');

const ScoreModel = {
  // Lấy tất cả điểm (chỉ PĐT hoặc GV mới nên gọi)
  getAll: async () => {
    const sql = `
      SELECT d.*, sv.ho_ten, mh.ten_mon, lmh.ma_lop_mh
      FROM diem d
      JOIN sinh_vien sv ON d.ma_sv = sv.ma_sv
      JOIN lop_mon_hoc lmh ON d.ma_lop_mh = lmh.ma_lop_mh
      JOIN mon_hoc mh ON lmh.ma_mh = mh.ma_mh
    `;
    const [results] = await pool.query(sql);
    return results;
  },

  // Lấy điểm theo mã sinh viên
  getByStudentId: async (ma_sv) => {
    const sql = `
      SELECT d.*, mh.ten_mon, lmh.hoc_ky, lmh.nam_hoc
      FROM diem d
      JOIN lop_mon_hoc lmh ON d.ma_lop_mh = lmh.ma_lop_mh
      JOIN mon_hoc mh ON lmh.ma_mh = mh.ma_mh
      WHERE d.ma_sv = ?
    `;
    const [results] = await pool.query(sql, [ma_sv]);
    return results;
  },

  // Lấy danh sách điểm theo mã lớp môn học (PĐT hoặc GV gọi)
  getByCourseClass: async (ma_lop_mh) => {
    const sql = `
      SELECT d.*, sv.ho_ten
      FROM diem d
      JOIN sinh_vien sv ON d.ma_sv = sv.ma_sv
      WHERE d.ma_lop_mh = ?
    `;
    const [results] = await pool.query(sql, [ma_lop_mh]);
    return results;
  },

  // Thêm mới điểm
  create: async (data) => {
    const { ma_diem, ma_sv, ma_lop_mh, diem_cc, diem_gk, diem_ck, ma_pdt } = data;
    const sql = `
      INSERT INTO diem (ma_diem, ma_sv, ma_lop_mh, diem_cc, diem_gk, diem_ck, ma_pdt)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await pool.query(sql, [ma_diem, ma_sv, ma_lop_mh, diem_cc, diem_gk, diem_ck, ma_pdt]);
    return result;
  },

  // Thêm điểm theo lớp môn học (có tính điểm tổng)
  bulkInsertByClass: async (ma_lop_mh, scores, ma_pdt) => {
    // Lấy trọng số từ lớp môn học
    const [weightRows] = await pool.query(
      "SELECT trong_so_cc, trong_so_gk, trong_so_ck FROM lop_mon_hoc WHERE ma_lop_mh = ?",
      [ma_lop_mh]
    );
    if (weightRows.length === 0) throw new Error("Không tìm thấy lớp môn học");
    const { trong_so_cc, trong_so_gk, trong_so_ck } = weightRows[0];

    const inserted = [];

    for (let s of scores) {
      const { ma_diem, ma_sv, diem_cc, diem_gk, diem_ck } = s;

      // Tính điểm tổng
      const diem_tong = (diem_cc * trong_so_cc + diem_gk * trong_so_gk + diem_ck * trong_so_ck) / 100;

      // Kiểm tra trùng mã điểm
      const [exist] = await pool.query(
        "SELECT * FROM diem WHERE ma_diem = ? AND ma_sv = ? AND ma_lop_mh = ?",
        [ma_diem, ma_sv, ma_lop_mh]
      );
      if (exist.length > 0) continue; // bỏ qua nếu đã tồn tại

      const [result] = await pool.query(
        `INSERT INTO diem (ma_diem, ma_sv, ma_lop_mh, diem_cc, diem_gk, diem_ck, diem_tong, ma_pdt)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [ma_diem, ma_sv, ma_lop_mh, diem_cc, diem_gk, diem_ck, diem_tong, ma_pdt]
      );
      inserted.push({ ma_sv, diem_tong });
    }

    return inserted;
  },


  // Cập nhật điểm theo lớp môn học
  updateScoresByClass: async (ma_lop_mh, scores) => {
    const sql = `
      UPDATE diem 
      SET diem_cc = ?, diem_gk = ?, diem_ck = ?
      WHERE ma_lop_mh = ? AND ma_sv = ?
    `;
  
    for (const score of scores) {
      const { ma_sv, diem_cc, diem_gk, diem_ck } = score;
      await pool.query(sql, [diem_cc, diem_gk, diem_ck, ma_lop_mh, ma_sv]);
    }
  
    return { message: "Cập nhật điểm theo lớp thành công" };
  },

  // Cập nhật điểm
  // Cập nhật điểm theo mã sinh viên
updateByMaSV: async (ma_sv, data) => {
  const { diem_cc, diem_gk, diem_ck } = data;
  const sql = `
    UPDATE diem
    SET diem_cc = ?, diem_gk = ?, diem_ck = ?
    WHERE ma_sv = ?
  `;
  const [result] = await pool.query(sql, [diem_cc, diem_gk, diem_ck, ma_sv]);
  return result.affectedRows;
},
// Cập nhật điểm theo mã sinh viên và mã lớp môn học
updateByMaSVAndClass: async (ma_sv, ma_lop_mh, data) => {
  const { diem_cc, diem_gk, diem_ck } = data;
  const sql = `
    UPDATE diem
    SET diem_cc = ?, diem_gk = ?, diem_ck = ?
    WHERE ma_sv = ? AND ma_lop_mh = ?
  `;
  const [result] = await pool.query(sql, [diem_cc, diem_gk, diem_ck, ma_sv, ma_lop_mh]);
  return result.affectedRows;
},


  // Xóa điểm
  delete: async (id) => {
    const sql = `DELETE FROM diem WHERE id = ?`;
    const [result] = await pool.query(sql, [id]);
    return result.affectedRows;
  }
};

module.exports = ScoreModel;