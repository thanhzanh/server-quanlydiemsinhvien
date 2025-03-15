const express = require('express');
const app = express();

// Middleware xử lý JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Import các route
const studentRoutes = require('./router/studentRoutes');
const teacherRoutes = require('./router/teacherRoutes');
const subjectRoutes = require('./router/teacherRoutes');

app.use('/', studentRoutes);
app.use('/', teacherRoutes);
app.use('/', subjectRoutes);

// Khởi động server
const port = 3000;
app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});
