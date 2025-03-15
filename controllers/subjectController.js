// controllers/subjectController.js
const subjectModel = require('../models/subjectModel');

module.exports = {
  // Lấy danh sách môn học
  getAllSubjects: (req, res) => {
    subjectModel.getAll((err, subjects) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(subjects);
    });
  },

  // Lấy thông tin 1 môn học theo ma_mh
  getSubjectById: (req, res) => {
    const ma_mh = req.params.ma_mh;
    subjectModel.getById(ma_mh, (err, subject) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!subject) return res.status(404).json({ message: 'Không tìm thấy môn học' });
      res.json(subject);
    });
  },

  // Thêm môn học mới
  createSubject: (req, res) => {
    subjectModel.create(req.body, (err, newSubject) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json(newSubject);
    });
  },

  // Cập nhật môn học
  updateSubject: (req, res) => {
    const ma_mh = req.params.ma_mh;
    subjectModel.update(ma_mh, req.body, (err, affectedRows) => {
      if (err) return res.status(500).json({ error: err.message });
      if (affectedRows === 0) return res.status(404).json({ message: 'Không tìm thấy môn học' });
      res.json({ message: 'Cập nhật môn học thành công' });
    });
  },

  // Xóa môn học
  deleteSubject: (req, res) => {
    const ma_mh = req.params.ma_mh;
    subjectModel.delete(ma_mh, (err, affectedRows) => {
      if (err) return res.status(500).json({ error: err.message });
      if (affectedRows === 0) return res.status(404).json({ message: 'Không tìm thấy môn học' });
      res.json({ message: 'Xóa môn học thành công' });
    });
  }
};
