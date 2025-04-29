const ClassSubject = require('../models/classSubjectModel');

module.exports.getAllLopMonHoc = async (req, res) => {
    try {
        const classes = await ClassSubject.getAllClassSubject();
        res.json({
            success: true,
            data: classes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

module.exports.getLopMonHocById = async (req, res) => {
    try {
        const { ma_lop_mh } = req.params;
        
        const dataClass = await ClassSubject.getLopMonHocById(ma_lop_mh);

        if (!dataClass) {
            return res.status(404).json({
                success: false,
                message: "Lớp môn học không tồn tại"
            });
        }

        res.json({
            success: true,
            data: dataClass
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

module.exports.createMonHoc = async (req, res) => {
    const { ma_lop_mh, ma_mh, ma_gv, hoc_ky, nam_hoc, trong_so_cc, trong_so_gk, trong_so_ck, sinh_vien_toi_da } = req.body;

    if (!ma_lop_mh || !ma_mh || !ma_gv || !hoc_ky || !nam_hoc) {
        return res.status(400).json({
            success: false,
            message: "Thiếu dữ liệu đầu vào"
        });
    }

    if (sinh_vien_toi_da < 0) {
        return res.status(400).json({
            success: false,
            message: "Lỗi sinh viên tối đa"
        });
    }

    const lopMonHoc = await ClassSubject.getLopMonHocById(ma_lop_mh);
    if (lopMonHoc) {
        return res.status(400).json({ success: false, message: "Mã lớp môn học đã tồn tại" });
    }

    const monHoc = await ClassSubject.getMonHocById(ma_mh);
    if (!monHoc) {
        return res.status(400).json({ success: false, message: "Mã môn học không tồn tại" });
    }

    const giangVien = await ClassSubject.getGiaoVienById(ma_gv);
    if (!giangVien) {
        return res.status(400).json({ success: false, message: "Mã giảng viên không tồn tại" });
    }

    // Lưu vào database
    const newClass = await ClassSubject.createLopMonHoc(ma_lop_mh, ma_mh, ma_gv, hoc_ky, nam_hoc, trong_so_cc, trong_so_gk, trong_so_ck, sinh_vien_toi_da);
    res.status(200).json({
        success: true,
        data: newClass
    });

};

module.exports.updateMonHoc = async (req, res) => {
    const { ma_lop_mh } = req.params;
    const { ma_mh, ma_gv } = req.body;
    
    // Kiểm tra lớp môn học có tồn tại không
    const lopMonHoc = await ClassSubject.getLopMonHocById(ma_lop_mh);
    if (!lopMonHoc) {
        return res.status(400).json({ success: false, message: "Mã lớp môn học không tồn tại" });
    }

    // Kiểm tra môn học
    if (ma_mh) {
        const monHoc = await ClassSubject.getMonHocById(ma_mh);
        if (!monHoc) {
            return res.status(400).json({ success: false, message: "Môn học không tồn tại" });
        }
    }

    // Kiểm tra giảng viên
    if (ma_gv) {
        const giangVien = await ClassSubject.getGiaoVienById(ma_gv);
        if (!giangVien) {
            return res.status(400).json({ success: false, message: "Giảng viên không tồn tại" });
        }
    }

    // Lưu vào database
    const updateClass = await ClassSubject.updateLopMonHoc(ma_lop_mh, req.body);
    res.status(200).json({
        success: true,
        data: updateClass
    });

};

module.exports.deleteMonHoc = async (req, res) => {
    try {
        const { ma_lop_mh } = req.params;
    
        // Kiểm tra lớp môn học có tồn tại không
        const lopMonHoc = await ClassSubject.getLopMonHocById(ma_lop_mh);
        if (!lopMonHoc) {
            return res.status(400).json({ success: false, message: "Mã lớp môn học không tồn tại" });
        }

        // Lưu vào database
        await ClassSubject.deleteLopMonHoc(ma_lop_mh);
        res.status(200).json({
            success: true,
            message: "Xóa lớp môn học thành công"
        });                                     
    } catch (error) {
        return res.status(500).json({ success: false, message: "Lỗi server", error });
    }

};

module.exports.getAllLop = async (req, res) => {
    
    try {    
        // Kiểm tra lớp có tồn tại không
        const lop = await ClassSubject.getAllClass();
        
        res.status(200).json({
            success: true,
            data: lop
        });                                     
    } catch (error) {
        return res.status(500).json({ success: false, message: "Lỗi server", error });
    }

};
