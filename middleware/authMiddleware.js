require("dotenv").config(); 
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;

if (!SECRET_KEY) {
    console.error(" SECRET_KEY không được định nghĩa! Kiểm tra file .env");
    process.exit(1);
}

const authenticateUser = (req, res, next) => {
    const authHeader = req.header("Authorization");
    if (!authHeader) return res.status(401).json({ message: "Truy cập bị từ chối" });

    const token = authHeader.split(" ")[1]; // Chỉ lấy phần token
    if (!token) return res.status(401).json({ message: "Token không hợp lệ" });

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ message: "Token không hợp lệ" });
    }
};

const authorizeRole = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Bạn không có quyền truy cập" });
        }
        next();
    };
};

module.exports = { authenticateUser, authorizeRole };
