const express = require('express');
const router = express.Router();

const controller = require('../controllers/student.controller');

router.post("/", controller.login);

module.exports = router;