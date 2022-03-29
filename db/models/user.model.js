const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
// const { type } = require("express/lib/response")
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        minlength:2,
        maxlength:25
    },
    email:{
        type:String,
        trim:true,
        lowercase:true,
        unique:true,
        required:true,
        validate(value){
            if(!validator.isEmail(value))
                throw new Error("invalid email format")
        }
    },
    phone:{
        type:String,
        trim:true,
        required:true,
        validate(value){
            if(!validator.isMobilePhone(value, ['ar-EG']))
                throw new Error("invalid phone number")
        }
    },
    password:{
        type:String,
        trim:true,
        required:true,
        minlength:6,
        // match:
        validate(value){
            if(value.includes(this.name))
                throw new Error('week password')
        }
    },
    age:{
        type:Number,
        min:21,
        max:60
    },
    image:{
        type:String,
        trim:true
    },
    gender:{
        type:String,
        trim:true,
        enum:['male', 'female']
    },
    type:{
        type:String,
        default:"user",
        trim:true,
        enum:['admin', 'user']
    },
    tokens:[{
        token:{
            type:String
        }
    }]
},
    {timestamps:true})

userSchema.methods.toJSON = function(){
    const user = this.toObject()
    delete user.password
    delete user.__v
    delete user.type
    return user
}


userSchema.pre("save", async function(){
    const user = this
    if(user.isModified("password"))
        user.password = await bcrypt.hash(user.password, Number(process.env.passwordSalt))
})
userSchema.statics.loginUser = async(email, password)=>{
    const user = await User.findOne({email:email})
    if(!user) throw new Error("invalid email or password")
    const matched = await bcrypt.compare(password, user.password)
    if(!matched) throw new Error("invalid email or password")
    return user
}
userSchema.statics.loginDashboard = async(email, password,type)=>{
    const user = await User.findOne({email:email})
    if(!user) throw new Error("invalid email or password")
    const matched = await bcrypt.compare(password, user.password)
    if(!matched) throw new Error("invalid email or password")
    if(user.type != type) throw new Error("you not admin")
    return user
}
userSchema.methods.generateToken = async function(){
    const user = this
    const token = jwt.sign({_id:user._id}, "g16")
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}
userSchema.virtual("userProduct", {
    ref:"Product",
    localField:"_id",
    foreignField:"userId"
})
userSchema.virtual("userComment", {
    ref:"Product.comments",
    localField:"_id",
    foreignField:"userId"
})
userSchema.virtual("userRate", {
    ref:"Product.rating",
    localField:"_id",
    foreignField:"userId"
})
const User = mongoose.model('User', userSchema)
module.exports = User