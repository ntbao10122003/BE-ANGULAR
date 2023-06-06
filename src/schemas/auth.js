import joi from "joi";

export const signupSchema = joi.object({
    name: joi.string().required().messages({
        "string.empty": "Tên không được để trống",
        "any.required": 'Trường "Tên" là bắt buộc',
    }),
    email: joi.string().email().required().messages({
        "string.empty": "Email không được để trống",
        "any.required": 'Trường "Email" là bắt buộc',
        "string.email": "Email không đúng định dạng",
    }),
    password: joi.string().min(6).required().messages({
        "string.empty": "Mật khẩu không được để trống",
        "any.required": "Trường mật khẩu là bắt buộc",
        "string.min": "Mật khẩu phải có ít nhất {#limit} ký tự",
    }),
    confirmPassword: joi.string().valid(joi.ref("password")).required().messages({
        "any.only": "Mật khẩu không khớp",
        "string.empty": "Mật khẩu không được để trống",
        "any.required": "Trường mật khẩu là bắt buộc",
    }),
    phone: joi.string().pattern(/^0\d+$/).min(10).required().messages({
        "string.empty": "Số điện thoại không được bỏ trống",
        "any.required": "Số điện thoại là bắt buộc",
        "string.min": "Số điện thoại phải có ít nhất {#limit} số",
        "string.pattern.base": "Số điện thoại phải bắt đầu bằng số 0 và không được bắt đầu bằng chuỗi",
    })
});

export const signinSchema = joi.object({
    email: joi.string().email().required().messages({
        "string.empty": "Email không được để trống",
        "any.required": 'Trường "Email" là bắt buộc',
        "string.email": "Email không đúng định dạng",
    }),
    password: joi.string().min(6).required().messages({
        "string.empty": "Mật khẩu không được để trống",
        "any.required": "Trường mật khẩu là bắt buộc",
        "string.min": "Mật khẩu phải có ít nhất {#limit} ký tự",
    }),
});
