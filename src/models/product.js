import mongoose from "mongoose";
import mongoosePaginate  from "mongoose-paginate-v2"
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    price: { 
      type: Number,
      require: true
    },
    shortDesc: {
      type: String,
      require: true
    },
    longDesc: {
      type: String,
      require: true
    },
    brand: {
      type: String,
      require: true
    },
    images: {
      type: String,
      require: true
    },
    categoryId: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
      },
  },
  { timestamps: true, versionKey: false }
);
productSchema.plugin(mongoosePaginate);
export default mongoose.model("Product", productSchema);