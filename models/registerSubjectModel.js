// models/subjectModel.js
const pool = require('../config/db');

module.exports = {

  // Lấy sinh viên bởi id
  getByStudentId: async(ma_sv) => {
    try {
      const [registrations] = await pool.execute(
        "SELECT * FROM sinh_vien_lop_mh WHERE ma_sv = ?",
        [ma_sv]
      );
      if (!registrations || registrations.length === 0) {
        return [];
      }

      const results = [];
      for (const reg of registrations) {
        const [lopRows] = await pool.execute(
          "SELECT hoc_ky, nam_hoc, ma_mh FROM lop_mon_hoc WHERE ma_lop_mh = ?",
          [reg.ma_lop_mh]
        );
        if (!lopRows || lopRows.length === 0) continue;
        const lop = lopRows[0];

        const [monHocRows] = await pool.execute(
          "SELECT ma_mh, ten_mon AS ten_mon_hoc, so_tin_chi, ma_bo_mon FROM mon_hoc WHERE ma_mh = ?",
          [lop.ma_mh]
        );
        if (!monHocRows || monHocRows.length === 0) continue;
        const monHoc = monHocRows[0];

        const [boMonRows] = await pool.execute(
          "SELECT ten_bo_mon, ma_khoa FROM bo_mon WHERE ma_bo_mon = ?",
          [monHoc.ma_bo_mon]
        );
        if (!boMonRows || boMonRows.length === 0) continue;
        const boMon = boMonRows[0];

        const [giangVienRows] = await pool.execute(
          "SELECT ho_ten, email FROM giang_vien WHERE ma_bo_mon = ?",
          [monHoc.ma_bo_mon]
        );
        const giangVien = giangVienRows.length > 0 ? giangVienRows[0] : {};

        const [khoaRows] = await pool.execute(
          "SELECT ten_khoa FROM khoa WHERE ma_khoa = ?",
          [boMon.ma_khoa]
        );
        const khoa = khoaRows.length > 0 ? khoaRows[0] : {};

        const [lopKhoaRows] = await pool.execute(
          "SELECT ten_lop FROM lop WHERE ma_khoa = ?",
          [boMon.ma_khoa]
        );
        const lopKhoa = lopKhoaRows.length > 0 ? lopKhoaRows[0] : {};

        results.push({
          ma_sv: reg.ma_sv,
          ma_lop_mh: reg.ma_lop_mh,
          hoc_ky: lop.hoc_ky,
          nam_hoc: lop.nam_hoc,
          ma_mh: monHoc.ma_mh,
          ten_mh: monHoc.ten_mon_hoc, // Đổi từ ten_mh thành ten_mon_hoc để đồng bộ
          so_tin_chi: monHoc.so_tin_chi,
          ten_bo_mon: boMon.ten_bo_mon,
          giang_vien: {
            ho_ten: giangVien.ho_ten || "Chưa có",
            email: giangVien.email || "Chưa có"
          },
          ten_khoa: khoa.ten_khoa || "Chưa có",
          ten_lop: lopKhoa.ten_lop || "Chưa có"
        });
      }

      return results;
    } catch (error) {
      console.error("Error in getByStudentId:", error.message);
      throw error;
    }
  },

  // Lấy danh sách sinh viên lớp môn học
  getByStudentAndClass: async(ma_sv, ma_lop_mh) => {
    const [rows] = await pool.execute(
      "SELECT * FROM sinh_vien_lop_mh WHERE ma_sv = ? AND ma_lop_mh = ?",
      [ma_sv, ma_lop_mh]
    );
    return rows[0];
  },

  // Tạo đăng ký môn học
  create: async(ma_sv, ma_lop_mh) => {
    const [result] = await pool.execute(
      "INSERT INTO sinh_vien_lop_mh (ma_sv, ma_lop_mh) VALUES (?, ?)",
      [ma_sv, ma_lop_mh]
    );
    return result.insertId;
  },

  // Cập nhật đăng ký môn học
  update: async(ma_sv, old_ma_lop_mh, new_ma_lop_mh) => {
    const [result] = await pool.execute(
      "UPDATE sinh_vien_lop_mh SET ma_lop_mh = ? WHERE ma_sv = ? AND ma_lop_mh = ?",
      [new_ma_lop_mh, ma_sv, old_ma_lop_mh]
    );
    return result.affectedRows;
  },

  // Xóa đăng ký môn học
  delete: async(ma_sv, ma_lop_mh) => {
    const [result] = await pool.execute(
      "DELETE FROM sinh_vien_lop_mh WHERE ma_sv = ? AND ma_lop_mh = ?",
      [ma_sv, ma_lop_mh]
    );
    return result.affectedRows;
  }
};
