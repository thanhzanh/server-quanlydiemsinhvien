const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Import routes
const authRoutes = require("./router/authRoutes");
const studentRoutes = require("./router/studentRoutes");
const teacherRoutes = require("./router/teacherRoutes");
const subjectRoutes = require("./router/subjectRoutes");
const registerSubjectRoutes = require("./router/registerSubjectRoutes");
const scoreRoutes = require("./router/scoreRoutes");
const classSubjectRoute = require('./router/classSubjectRoutes');
const userRoute = require('./router/userRoutes');

// Định tuyến API
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/subjects", subjectRoutes);
app.use('/api/register-subject', registerSubjectRoutes);
app.use("/api/scores", scoreRoutes);
app.use('/api/class-subject', classSubjectRoute);
app.use('/api/users', userRoute);


// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
