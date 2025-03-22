const express = require('express');
const router = express.Router();

const controller = require('../controllers/teacher.controller');

// API quản lý giáo viên

router.get("/:ma_gv/lop-mon-hoc", controller.getDSLopMonHoc);

router.get("/:ma_gv/lop-mon-hoc/:ma_lop_mh/sinh-vien", controller.getDSSVByLopMonHoc);

router.get("/:ma_gv/lop-mon-hoc/:ma_lop_mh/diem", controller.getDiemSVLopMonHoc);  

// router.get("/:ma_gv/lop-mon-hoc", controller.filterLopMonHocBySemesterAndYear);  

module.exports = router;