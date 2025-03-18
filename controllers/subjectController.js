// controllers/subjectController.js
const subjectModel = require('../models/subjectModel');

module.exports = {
  // Lấy danh sách môn học
  getAllSubjects: async (req, res) => {
    try {
      const subjects = await subjectModel.getAll();
      res.json(subjects);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Lấy thông tin 1 môn học theo ma_mh
  getSubjectById: async (req, res) => {
    const ma_mh = req.params.ma_mh;
    try {
      const subject = await subjectModel.getById(ma_mh);
      if (!subject) return res.status(404).json({ message: 'Không tìm thấy môn học' });
      res.json(subject);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Thêm môn học mới
  createSubject: async (req, res) => {
    try {
      const newSubject = await subjectModel.create(req.body);
      res.status(201).json(newSubject);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Cập nhật môn học
  updateSubject: async (req, res) => {
    const ma_mh = req.params.ma_mh;
    try {
      const affectedRows = await subjectModel.update(ma_mh, req.body);
      if (affectedRows === 0) return res.status(404).json({ message: 'Không tìm thấy môn học' });
      res.json({ message: 'Cập nhật môn học thành công' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Xóa môn học
  deleteSubject: async (req, res) => {
    const ma_mh = req.params.ma_mh;
    try {
      const affectedRows = await subjectModel.delete(ma_mh);
      if (affectedRows === 0) return res.status(404).json({ message: 'Không tìm thấy môn học' });
      res.json({ message: 'Xóa môn học thành công' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
