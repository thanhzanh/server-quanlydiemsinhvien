const userModel = require("../models/user");
const bcrypt = require("bcryptjs");

module.exports = {
    
      // Lấy danh sách user
      getAlluser: async (req, res) => {
        try {
          const user = await userModel.getAll();
          res.json(user);
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
      },
      getUserById: async (req, res) => {
          const id = parseInt(req.params.id);
          
          try {
            const user = await userModel.getById(id);
            if (!user)
              return res.status(404).json({ message: "Không tìm thấy tài khoản" });
            res.json(user);
          } catch (err) {
            res.status(500).json({ error: err.message });
          }
        },
        // cập nhật tài khoản 
        updateUser: async (req, res) => {
          const id = req.params.id;
          const data = req.body;          
        
          try {
            if (data.password) {
              const salt = await bcrypt.genSalt(10);
              data.password = await bcrypt.hash(data.password, salt);
            }
        
            const affectedRows = await userModel.update(id, data);
        
            if (affectedRows === 0) {
              return res.status(404).json({ message: "Không tìm thấy tài khoản" });
            }
        
            res.json({ message: "Cập nhật tài khoản thành công" });
          } catch (err) {
            res.status(500).json({ error: err.message });
          }
        },              
      
        // Xóa tài khỏa 
        deleteUser: async (req, res) => {
          const id = req.params.id;
          try {
            const affectedRows = await userModel.delete(id);
            if (affectedRows === 0)
              return res.status(404).json({ message: "Không tìm thấy tài khoản " });
            res.json({ message: "Xóa tài khoản thành công" });
          } catch (err) {
            res.status(500).json({ error: err.message });
          }
        },
};