const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productTitle: { type: String, required: true },

    shortDescription: { type: String, required: true },

    longDescription: { type: String, required: true },

    rating: { 
      type: Number, 
      min: 0, 
      max: 5, 
      default: 0 
    },

    price: { type: Number, required: true },

    quantity: { type: Number, required: true, default: 0 },

    mainImageUrl: { type: String, required: true },

    moreImages: {
      type: [String],     // array of 4 image URLs
      validate: {
        validator: function (arr) {
          return arr.length <= 4;     // max 4 images allowed
        },
        message: "More than 4 images not allowed"
      }
    }
  },
  { timestamps: true }
);
const productModel = mongoose.model("Product", productSchema);
module.exports =  productModel