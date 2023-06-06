import Auth from "../models/auth";
import { jwt } from "jsonwebtoken";
export const checkPermission = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
          return res.status(403).json({
            message: "Bạn chưa đăng nhập",
          });
        }
        const token = req.headers.authorization.split(" ")[1];
        const { id } = jwt.verify(token, "ManhLD");
    
        const user = await Auth.findById(id);
        if (user.role !== "admin") {
          return res.status(403).json({
            message: "Bạn không có quyền truy cập!",
          });
        }
        next();
      } catch (error) {
    
        
      }
};