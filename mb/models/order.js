const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema
const Schema = mongoose.Schema

const ProductCartSchema = new Schema({
    product: {
        type: ObjectId,
        ref: "Product"
    },
    name: String,
    count: Number,
    price: Number
});

const ProductCart = mongoose.model("ProductCart", ProductCartSchema);

const OrderSchema = new Schema({
    products: [ProductCartSchema],
    transaction_id: {},
    amount: {
         type: Number
    },
    status: {
        type: String,
        default: "Received",
        enum: ["Cancelled", "Delivered", "Shipped", "Processing", "Received"]
    },
    address: String,
    updated: Date,
    user: {
        type:ObjectId,
        ref: "User"
    },
    buyType:
    {
        type:Number
    }
},
{timestamps: true}
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = {Order, ProductCart};