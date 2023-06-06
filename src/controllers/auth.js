import Auth from "../models/auth";
import bcrypt from "bcryptjs";
import { signinSchema, signupSchema } from "../schemas/auth";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
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
    const userPhone = await Auth.findOne({ phone });
    if (userPhone) {
      return res.status(400).json({
        message: "Số điện thoại đã được sử dụng",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const auth = await Auth.create({
      name,
      email,
      password: hashedPassword,
      phone
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

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { error } = signinSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        messages: errors,
      });
    }

    const auth = await Auth.findOne({ email });
    if (!auth) {
      return res.status(404).json({
        message: "Tài khoản không tồn tại",
      });
    }

    const isMatch = await bcrypt.compare(password, auth.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Mật khẩu không đúng",
      });
    }
    const token = jwt.sign({ id: auth._id }, "ManhLD", { expiresIn: "1d" });
    return res.status(200).json({
      message: "Đăng nhập thành công",
      accessToken: token,
      auth,
    });
  } catch (error) {}
};
