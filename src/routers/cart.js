import express from "express";
import { createCart, getOneCart } from "../controllers/cart";

const router = express.Router();

router.post("/:userId/add/cart", createCart);
router.get("/:userId/cart", getOneCart);
// router.post("/add/cart", create);
// router.delete("/cart/:id", remove);
// router.patch("/cart/:id", update);

export default router;