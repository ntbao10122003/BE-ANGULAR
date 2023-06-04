import express from "express";
import product from "../models/product";

const router = express.Router();

router.get("/search/:keyword" , async (req , res) => {
    const data = await product.find(
        {
                "$or":[
                    {name:{$regex:req.params.keyword},
                }
                ]
        }
    ).exec();
    res.send(data)
});
export default router;
