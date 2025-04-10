const pool = require('../config/db');
module.exports = {
    // Lấy tất cả user 
    getAll: async () => {
      try {
        const [rows] = await pool.query(`
          SELECT id, username, role
          FROM users
        `);
        return rows;
      } catch (error) {
        throw error;
      }
    },
    getById: async (id) => {
        const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
        return rows[0];
      },
    
      update: async (id, data) => {
        const { username, password, role, ma_gv, ma_sv } = data;
        const sql = `
          UPDATE users
          SET username = ?, password = ?, role = ?, ma_gv = ?, ma_sv = ?
          WHERE id = ?
        `;
        const [result] = await pool.query(sql, [username, password, role, ma_gv, ma_sv, id]);
        return result.affectedRows; // Trả về số dòng bị ảnh hưởng
      },
      
      delete: (id, callback) => {
        const sql = 'DELETE FROM users WHERE id = ?';
        pool.query(sql, [id], (err, result) => {
          if (err) return callback(err, null);
          callback(null, result.affectedRows);
        });
      },
    

};
