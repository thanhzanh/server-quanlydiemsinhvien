const express = require('express');
const router = express.Router();

const controller = require('../controllers/classSubject.controller');

// API Lớp môn học

router.get("/", controller.getAllLopMonHoc); 

router.get("/:ma_lop_mh", controller.getLopMonHocById); 

router.post("/create", controller.createMonHoc); 

router.put("/update/:ma_lop_mh", controller.updateMonHoc); 

router.delete("/delete/:ma_lop_mh", controller.deleteMonHoc); 

module.exports = router;