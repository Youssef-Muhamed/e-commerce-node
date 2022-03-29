const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:String,
        required:true,
    },
    country_made:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        required:true,
    },
    tags:{
        type:String
    },
    images:[{
       image:{
            type:String
       }
    }],
    rating:[{
        rate:{
            type:Number,
            enum:[1,2,3,4,5]
        },
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        }
    }],
    approve:{
        type:Boolean,
        default:false
    },
    comments:[
        {
            comment:{type:String},
            userId:{
                type: mongoose.Schema.Types.ObjectId,
                ref:"User",
                required:true
            }
        }
    ],
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    catId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true
    }

},
    {timestamps:true})
    productSchema.methods.toJSON = function(){
        const product = this.toObject()
        delete product.__v
        delete product.approve
        return product
    }

const Product = mongoose.model('Product', productSchema)
module.exports = Product