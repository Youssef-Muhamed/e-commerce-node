const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const categoruSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
    },
    parent:{
        type:String,
        default:0
    }
},
    {timestamps:true})

categoruSchema.virtual("catProduct", {
        ref:"Product",
        localField:"_id",
        foreignField:"catId"
})
const Category = mongoose.model('Category', categoruSchema)
module.exports = Category