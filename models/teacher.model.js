const database = require('../config/database');

// Lấy danh sách môn học, lớp mà giáo viên đó dạy
const getDSLopMonHocByGiaoVien = async (ma_gv) => {
    const [rows] = await database.query(
        `SELECT DISTINCT  lmh.ma_lop_mh, mh.ma_mh, mh.ten_mon, lmh.hoc_ky, lmh.nam_hoc
        FROM lop_mon_hoc lmh
        JOIN mon_hoc mh ON lmh.ma_mh = mh.ma_mh
        WHERE lmh.ma_gv = ?`,
        [ma_gv]
    );

    return rows;
};

// Lấy danh sách sinh viên trong từng lớp môn học mà giáo viên đó dạy
const getStudentsByClass = async (ma_gv, ma_lop_mh) => {
    const [rows] = await database.query(
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
};

// Lấy điểm sinh viên trong lớp môn học mà giáo viên đó dạy
const getStudentScoresByClass = async (ma_gv, ma_lop_mh) => {
    const [rows] = await database.query(
        `SELECT sv.ma_sv, sv.ho_ten, sv.email, lmh.ma_lop_mh, d.diem_cc, d.diem_gk, d.diem_ck
         FROM diem d
         JOIN sinh_vien sv ON d.ma_sv = sv.ma_sv
         JOIN lop_mon_hoc lmh ON d.ma_lop_mh = lmh.ma_lop_mh
         WHERE lmh.ma_gv = ? AND lmh.ma_lop_mh = ?`,
         [ma_gv, ma_lop_mh]
    );

    return rows;
};

module.exports = { getDSLopMonHocByGiaoVien, getStudentsByClass, getStudentScoresByClass }
