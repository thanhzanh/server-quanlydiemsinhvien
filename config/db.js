// db.js

// db.js

const mysql = require('mysql2');

const pool = mysql.createPool({
  host: '127.0.0.1',       // Địa chỉ host MySQL (thường là 'localhost')
  user: 'root',            // Tên người dùng MySQL của bạn
  password: 'Kiet123@', // Mật khẩu MySQL của bạn
  database: 'diem_SinhVien', // Tên cơ sở dữ liệu bạn muốn kết nối
  waitForConnections: true, // Chờ kết nối khi pool hết kết nối hiện có
  connectionLimit: 10,      // Số lượng kết nối tối đa trong pool
  queueLimit: 0,
   port: 3306       // Không giới hạn hàng đợi khi pool đầy
});

// Kiểm tra kết nối
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Kết nối MySQL thất bại:', err);
  } else {
    console.log('Kết nối MySQL thành công qua Pool');
    connection.release(); // Giải phóng connection sau khi kiểm tra
  }
});

module.exports = pool;
