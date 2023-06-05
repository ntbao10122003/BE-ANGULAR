import jwt from "jsonwebtoken";
import Auth from "../models/auth";

export const checkPermission = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(403).json({
                message: "Bạn chưa đăng nhập",
            });
        }
        const token = req.headers.authorization.split(" ")[1]; 
        console.log("token", token);
        jwt.verify(token, "ManhLD", async (error, payload) => {
            console.log("error", error);
            if (error) {
                if (error.name === "TokenExpiredError") {
                    return res.json({
                        message: "Token hết hạn",
                    });
                }
                if (error.name === "JsonWebTokenError") {
                    return res.json({
                        message: "Token không hợp lệ",
                    });
                }
            }
            const auth = await Auth.findById(payload.id);
            console.log(auth);
            if (!auth || auth.role !== "admin") {
                return res.status(403).json({
                    message: "Bạn không có quyền truy cập tài nguyên!",
                });
            }
            next();
        });
    } catch (error) {
        return res.status(401).json({
            message: error.message || "Token không hợp lệ",
        });
    }
};
