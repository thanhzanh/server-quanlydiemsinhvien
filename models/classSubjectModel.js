const database = require('../config/db');

// Lấy danh sách lớp môn học
const getAllClassSubject = async() => {
    const [rows] = await database.query("SELECT ma_lop_mh, ma_mh, ma_gv, hoc_ky, nam_hoc, trong_so_cc, trong_so_gk, trong_so_ck, sinh_vien_toi_da FROM lop_mon_hoc");
    return rows;
};

// Lấy lớp môn học theo ma_lop_mh
const getLopMonHocById = async (ma_lop_mh) => {
    const [rows] = await database.query("SELECT * FROM lop_mon_hoc WHERE ma_lop_mh = ?", [ma_lop_mh]);
    return rows[0];
};

// Lấy môn học theo ma_mh
const getMonHocById = async (ma_mh) => {
    const [rows] = await database.query("SELECT * FROM mon_hoc WHERE ma_mh = ?", [ma_mh]);
    return rows[0];
};

// Lấy giáo viên theo ma_gv
const getGiaoVienById = async (ma_gv) => {
    const [rows] = await database.query("SELECT * FROM giang_vien WHERE ma_gv = ?", [ma_gv]);
    return rows[0];
};

// Tạo lớp môn học
const createLopMonHoc = async(maLopMonHoc,maMonHoc, maGiaoVien, hocKy, namHoc, trong_so_cc, trong_so_gk, trong_so_ck, sinh_vien_toi_da) => {
    const [rows] = await database.query("INSERT INTO lop_mon_hoc (ma_lop_mh, ma_mh, ma_gv, hoc_ky, nam_hoc, trong_so_cc, trong_so_gk, trong_so_ck, sinh_vien_toi_da) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [maLopMonHoc, maMonHoc, maGiaoVien, hocKy, namHoc, trong_so_cc, trong_so_gk, trong_so_ck, sinh_vien_toi_da]
    );
    return rows;
};

// Cập nhật lớp môn học
const updateLopMonHoc = async(ma_lop_mh, data) => {
    const { ma_mh, ma_gv, hoc_ky, nam_hoc, trong_so_cc, trong_so_gk, trong_so_ck, sinh_vien_toi_da } = data;
    const query =`
        UPDATE lop_mon_hoc 
        SET ma_mh = COALESCE(?, ma_mh), 
            ma_gv = COALESCE(?, ma_gv), 
            hoc_ky = COALESCE(?, hoc_ky), 
            nam_hoc= COALESCE(?, nam_hoc),
            trong_so_cc= COALESCE(?, trong_so_cc),
            trong_so_gk= COALESCE(?, trong_so_gk), 
            trong_so_ck= COALESCE(?, trong_so_ck), 
            sinh_vien_toi_da= COALESCE(?, sinh_vien_toi_da)
        WHERE ma_lop_mh = ?
    `;
    await database.query(query, [ma_mh, ma_gv, hoc_ky, nam_hoc, trong_so_cc, trong_so_gk, trong_so_ck, sinh_vien_toi_da, ma_lop_mh])
    return { ma_lop_mh, ...data };
};

// Xóa lớp môn học
const deleteLopMonHoc = async(ma_lop_mh) => {
    await database.query("DELETE FROM lop_mon_hoc WHERE ma_lop_mh = ?", [ma_lop_mh]);
    return true;
};

module.exports = { getAllClassSubject, getLopMonHocById, getMonHocById, getGiaoVienById, createLopMonHoc, updateLopMonHoc, deleteLopMonHoc };