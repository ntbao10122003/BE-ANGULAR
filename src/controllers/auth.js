import Auth from "../models/auth";
import bcrypt from "bcryptjs";
import { signupSchema } from "../schemas/auth";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const { error } = signupSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const userExist = await Auth.findOne({ email });
    if (userExist) {
      return res.status(400).json({
        message: "Emai đã tồn tại",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const auth = await Auth.create({
      name,
      email,
      password: hashedPassword,
    });
    // Không trả password
    auth.password = undefined;

    return res.status(201).json({
      message: "Đăng kí thành công",
      auth,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
