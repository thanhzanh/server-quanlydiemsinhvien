const Score = require("../models/scoreModel");

exports.getAllScores = async (req, res) => {
    try {
        const results = await Score.getAll();
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getStudentScore = async (req, res) => {
    const { id } = req.params;
    if (req.user.role === "sinhvien" && req.user.ma_sv !== id) {
        return res.status(403).json({ message: "Bạn chỉ có thể xem điểm của chính mình" });
    }
    
    try {
        const result = await Score.getByStudentId(id);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addScore = async (req, res) => {
    if (req.user.role !== "pdt") {
        return res.status(403).json({ message: "Chỉ PĐT mới được nhập điểm" });
    }

    const { ma_sv, ma_mh, diem_cc, diem_gk, diem_ck } = req.body;
    
    try {
        const result = await Score.create({ ma_sv, ma_mh, diem_cc, diem_gk, diem_ck });
        res.status(201).json({ message: "Điểm đã được thêm", result });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
