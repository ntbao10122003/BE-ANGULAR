import express from "express";
import { createCart, createCartItem, getOneCart } from "../controllers/cart";

const router = express.Router();

router.post("/:userId/add/cart", createCart);
router.post("/:cartId/add/cartItem", createCartItem);
router.get("/:userId/cart", getOneCart);

export default router;
