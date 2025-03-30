

const mysql = require("mysql2/promise"); // Đúng, sử dụng phiên bản có hỗ trợ Promise
require("dotenv").config();
const pool = mysql.createPool({
  host: '127.0.0.1',      
  user: 'root',         
  password: 'Kiet123@', 
  database: 'diem_sinhvien',
  waitForConnections: true, 
  connectionLimit: 10,      
  queueLimit: 0,
   port: 3306      
});

// Kiểm tra kết nối
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Kết nối MySQL thành công!");
    connection.release();
  } catch (error) {
    console.error("Kết nối MySQL thất bại:", error);
  }
})();

module.exports = pool;
