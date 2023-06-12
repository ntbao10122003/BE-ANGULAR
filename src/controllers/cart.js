import Joi from 'joi';
import Cart from '../models/cart'
import User from '../models/auth'

export const createCart = async (req, res) => {
    const { userId } = req.params;

    try {
        // Kiểm tra xem người dùng có tồn tại hay không
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ error: 'Không tìm thấy người dùng' });
            return;
        }

        // Tìm hoặc tạo giỏ hàng cho người dùng
        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = new Cart({ user: userId });
        }

        // Lưu giỏ hàng
        const updatedCart = await cart.save();

        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi tạo giỏ hàng' });
    }
};

export const createCartItem = async (req, res) => {
    const { cartId } = req.params;
    const { productId, name, price, quantity, images } = req.body;

    try {
        // Kiểm tra xem giỏ hàng có tồn tại hay không
        const cart = await Cart.findById(cartId);
        if (!cart) {
            res.status(404).json({ error: 'Không tìm thấy giỏ hàng' });
            return;
        }

        // Thêm sản phẩm vào giỏ hàng
        const newItem = {
            productId,
            name,
            price,
            quantity,
            images
        };
        cart.items.push(newItem);

        // Lưu giỏ hàng
        const updatedCart = await cart.save();

        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi thêm sản phẩm vào giỏ hàng' });
    }
};

export const getOneCart = async (req, res) => {
    const { userId } = req.params;

    try {
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            res.status(404).json({ error: 'Không tìm thấy giỏ hàng' });
        } else {
            res.status(200).json(cart);
        }
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi lấy thông tin giỏ hàng' });
    }
};
