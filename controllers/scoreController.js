// controllers/scoreController.js
const Score = require("../models/scoreModel");

// Lấy tất cả điểm (chỉ GV hoặc PĐT)
exports.getAllScores = async (req, res) => {
  try {
    const results = await Score.getAll();
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lấy điểm của 1 sinh viên - SV chỉ được xem của mình
exports.getStudentScore = async (req, res) => {
  const { ma_sv } = req.params;
  
  try {
    const result = await Score.getByStudentId(ma_sv);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lấy điểm theo lớp môn học (GV hoặc PĐT)
exports.getScoresByCourseClass = async (req, res) => {
  const { ma_lop_mh } = req.params;

  try {
    const results = await Score.getByCourseClass(ma_lop_mh);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Thêm 1 bản ghi điểm (chỉ PĐT)
exports.addScore = async (req, res) => {
  const { ma_diem, ma_sv, ma_lop_mh, diem_cc, diem_gk, diem_ck, ma_pdt } = req.body;

  try {
    const result = await Score.create({ ma_diem, ma_sv, ma_lop_mh, diem_cc, diem_gk, diem_ck, ma_pdt });
    res.status(201).json({ message: "Thêm điểm thành công", result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Thêm điểm theo lớp môn học
exports.bulkInsertByClass = async (req, res) => {
  const { ma_lop_mh, scores } = req.body;

  try {
    const result = await Score.bulkInsertByClass(ma_lop_mh, scores, req.user.ma_pdt);
    res.status(201).json({ message: "Nhập điểm thành công", inserted: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Cập nhật điểm theo lớp môn học
exports.updateScoresByClass = async (req, res) => {
  const { ma_lop_mh } = req.params;
  const { scores } = req.body; // scores = [{ ma_sv, diem_cc, diem_gk, diem_ck }, ...]  

  if (!Array.isArray(scores)) {
    return res.status(400).json({ message: "Danh sách điểm không hợp lệ" });
  }

  try {
    const result = await Score.updateScoresByClass(ma_lop_mh, scores);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Cập nhật điểm (chỉ PĐT)
exports.updateScore = async (req, res) => {
  const { id } = req.params;
  const { diem_cc, diem_gk, diem_ck } = req.body;

  try {
    const affected = await Score.update(id, { diem_cc, diem_gk, diem_ck });
    if (affected === 0) {
      return res.status(404).json({ message: "Không tìm thấy bản ghi để cập nhật" });
    }

    res.json({ message: "Cập nhật điểm thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Xóa điểm (chỉ PĐT)
exports.deleteScore = async (req, res) => {
 
  const { id } = req.params;

  try {
    const affected = await Score.delete(id);
    if (affected === 0) {
      return res.status(404).json({ message: "Không tìm thấy bản ghi để xóa" });
    }

    res.json({ message: "Xóa điểm thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};