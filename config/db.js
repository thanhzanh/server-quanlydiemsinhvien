

const mysql = require("mysql2/promise"); // Đúng, sử dụng phiên bản có hỗ trợ Promise
require("dotenv").config();
const pool = mysql.createPool({
  host: '127.0.0.1',      
  user: 'root',         
  password: 'Kiet123@', 
  database: 'diem_SinhVien',
  waitForConnections: true, 
  connectionLimit: 10,      
  queueLimit: 0,
   port: 3306      
});

// Kiểm tra kết nối
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Kết nối MySQL thất bại:', err);
  } else {
    console.log('Kết nối MySQL thành công qua Pool');
    connection.release(); 
  }
});

module.exports = pool;
