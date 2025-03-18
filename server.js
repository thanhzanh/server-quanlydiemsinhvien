const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

// Import routes
const authRoutes = require("./router/authRoutes");
const studentRoutes = require("./router/studentRoutes");
const teacherRoutes = require("./router/teacherRoutes");
const subjectRoutes = require("./router/subjectRoutes");
const scoreRoutes = require("./router/scoreRoutes");

// Định tuyến API
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/scores", scoreRoutes);

// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
