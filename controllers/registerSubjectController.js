const Registration = require("../models/registerSubjectModel");

const getRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.getByStudentId(req.params.ma_sv);
    return res.json(registrations);
  } catch (error) {
    return res.status(500).json({ error: "Lỗi khi lấy danh sách đăng ký môn học", message: error.message });
  }
};

const createRegistration = async (req, res) => {
  try {
    const { ma_sv, ma_lop_mh } = req.body;

    // Kiểm tra nếu ma_sv từ token khác với ma_sv trong request
    if (req.user.ma_sv !== ma_sv) {
      return res.status(403).json({ message: "Bạn chỉ có thể đăng ký môn học cho chính mình" });
    }

    // Kiểm tra thiếu dữ liệu
    if (!ma_sv || !ma_lop_mh) {
      return res.status(400).json({ message: "Thiếu mã sinh viên hoặc mã lớp môn học" });
    }

    // Kiểm tra sinh viên đã đăng ký môn học này chưa
    const existing = await Registration.getByStudentAndClass(ma_sv, ma_lop_mh);
    if (existing) {
      return res.status(400).json({ message: "Đăng ký môn học đã tồn tại" });
    }

    // Thêm đăng ký mới
    await Registration.create(ma_sv, ma_lop_mh);
    return res.status(201).json({ message: "Đăng ký môn học thành công" });
  } catch (error) {
    return res.status(500).json({ error: "Lỗi khi thêm đăng ký môn học", message: error.message });
  }
};

const updateRegistration = async (req, res) => {
  try {
    const { ma_sv, ma_lop_mh } = req.params;
    const { new_ma_lop_mh } = req.body;

    // Kiểm tra quyền: chỉ được cập nhật của chính mình
    if (req.user.ma_sv !== ma_sv) {
      return res.status(403).json({ message: "Bạn chỉ có thể cập nhật đăng ký của chính mình" });
    }

    if (!new_ma_lop_mh) {
      return res.status(400).json({ message: "Thiếu mã lớp môn học mới" });
    }

    // Kiểm tra xem đăng ký có tồn tại không
    const existing = await Registration.getByStudentAndClass(ma_sv, ma_lop_mh);
    if (!existing) {
      return res.status(404).json({ message: "Đăng ký môn học không tồn tại" });
    }

    // Cập nhật đăng ký
    const updatedRows = await Registration.update(ma_sv, ma_lop_mh, new_ma_lop_mh);
    if (!updatedRows) {
      return res.status(500).json({ message: "Cập nhật không thành công" });
    }

    return res.json({ message: "Cập nhật đăng ký môn học thành công" });
  } catch (error) {
    return res.status(500).json({ error: "Lỗi khi sửa đăng ký môn học", message: error.message });
  }
};

const deleteRegistration = async (req, res) => {
  try {
    const { ma_sv, ma_lop_mh } = req.params;

    // Kiểm tra quyền: chỉ được xóa đăng ký của chính mình
    if (req.user.ma_sv !== ma_sv) {
      return res.status(403).json({ message: "Bạn chỉ có thể xóa đăng ký của chính mình" });
    }

    // Kiểm tra xem đăng ký có tồn tại không
    const existing = await Registration.getByStudentAndClass(ma_sv, ma_lop_mh);
    if (!existing) {
      return res.status(404).json({ message: "Đăng ký môn học không tồn tại" });
    }

    // Thực hiện xóa
    const deletedRows = await Registration.delete(ma_sv, ma_lop_mh);
    if (!deletedRows) {
      return res.status(500).json({ message: "Xóa không thành công" });
    }

    return res.json({ message: "Xóa đăng ký môn học thành công" });
  } catch (error) {
    return res.status(500).json({ error: "Lỗi khi xóa đăng ký môn học", message: error.message });
  }
};

const getSubjectsByDepartment = async (req, res) => {
  const { ma_bo_mon } = req.params;
  try {
    const [monHoc] = await pool.execute(
      "SELECT * FROM mon_hoc WHERE ma_bo_mon = ?",
      [ma_bo_mon]
    );
    res.json(monHoc);
  } catch (error) {
    res.status(500).json({ message: "Lỗi lấy danh sách môn học", error });
  }
};


module.exports = {
  getRegistrations,
  createRegistration,
  updateRegistration,
  deleteRegistration,
  getSubjectsByDepartment
};