

const mysql = require("mysql2/promise"); // Đúng, sử dụng phiên bản có hỗ trợ Promise
require("dotenv").config();
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,      
  waitForConnections: true, 
  connectionLimit: 10,      
  queueLimit: 0,
  ssl: { 
    rejectUnauthorized: false  // Có thể cần thiết cho kết nối an toàn qua public network
  }
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
