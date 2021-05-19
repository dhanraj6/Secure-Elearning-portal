const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    creator: {
        type: ObjectId,
        ref:"User",
        required: true
    },
    filePath:{
         type:String
     },
    // duration:
    // {
    //     type:String
    // },
    description: {
        type: String,
        trim: true,
        required: true,
    },
    buyPrice: {
        type: Number,
        required: true,
        maxlength: 32,
        trim: true
    },
    rentPrice: {
        type: Number,
        required: true,
        maxlength: 32,
        trim: true
    },
    category: {
        type: ObjectId,
        ref: "Category",
        required: true
    },
    stock: {
        type: Number
    },
    sold: {
        type: Number,
        default: 0
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    resource: {
        data: Buffer,
        contentType: String
    }
},
    { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);