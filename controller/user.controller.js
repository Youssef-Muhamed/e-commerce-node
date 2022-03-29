const userModel = require("../db/models/user.model")
const fs = require("fs")
class User{
    static add = async(req, res)=>{
        try{
            const user = new userModel(req.body)
            await user.save()
            res.status(200).send({
                apiStatus:true,
                data:user,
                message:"user added"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus:false,
                errors:e.message,
                message:"error in register"
            })
        }
    }

    static all = async(req,res)=>{
        try{
            const users = await userModel.find().sort({email:1})
            res.status(200).send({
                apiStatus:true,
                data:users,
                message:"users fetched"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus:false,
                errors:e.message,
                message:"error in fetching"
            })
        }
    }
    static single = async(req,res)=>{
        try{
            const user = await userModel.findById(req.params.id)
            res.status(200).send({
                apiStatus:true,
                data:user,
                message:"users fetched"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus:false,
                errors:e.message,
                message:"error in fetching"
            })
        }
    }
    static del = async(req,res)=>{
        try{
            const user = await userModel.findByIdAndDelete(req.params.id)
            fs.unlink(req.params.image, function (err) {            
                if (err) {                                                 
                    console.error(err);                                    
                }    
            })
            res.status(200).send({
                apiStatus:true,
                data:user,
                message:"user deleted"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus:false,
                errors:e.message,
                message:"error in deleting"
            })
        }

    }
    static delWithToken = async(req,res)=>{
        try{
            const user = await userModel.findByIdAndDelete(req.user.id)
            fs.unlink(req.user.image, function (err) {            
                if (err) {                                                 
                    console.error(err);                                    
                }    
            })
            res.status(200).send({
                apiStatus:true,
                data:user,
                message:"user deleted"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus:false,
                errors:e.message,
                message:"error in deleting"
            })
        }

    }
    static edit = async(req,res)=>{
        try{
            const user = await userModel.findByIdAndUpdate(
                req.params.id, req.body, {runValidators:true}
            )
            res.status(200).send({
                apiStatus:true,
                data:user,
                message:"user Updated"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus:false,
                errors:e.message,
                message:"error in updating"
            })
        }

    }

    static editWithToken = async(req,res)=>{
        try{
            const user = await userModel.findByIdAndUpdate(
                req.user._id, req.body, {runValidators:true}
            )
            res.status(200).send({
                apiStatus:true,
                data:user,
                message:"user deleted"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus:false,
                errors:e.message,
                message:"error in deleting"
            })
        }

    }

    static login = async(req,res)=>{
        try{
            const user = await userModel.loginUser(req.body.email, req.body.password)
            const token = await user.generateToken()
            res.status(200).send({
                apiStatus:true,
                data:{user,token},
                message:"logged in"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus:false,
                errors:e.message,
                message:"error in logged"
            })    
        }
    }
    static loginAdmin = async(req,res)=>{
        try{
            const user = await userModel.loginDashboard(req.body.email, req.body.password,"admin")
            const token = await user.generateToken()
            res.status(200).send({
                apiStatus:true,
                data:{user,token},
                message:"logged in"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus:false,
                errors:e.message,
                message:"error in logged not admin"
            })    
        }
    }
    static logOut = async(req, res)=>{
        try{
            req.user.tokens = req.user.tokens.filter(t=>{
                return t.token!=req.token
            })
            await req.user.save()
            res.status(200).send({
                apiStatus:true, data:"", message:"logged out"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus:false,
                errors:e.message,
                message:"error in deleting"
            }) 
        }
    }
    static logOutAll = async(req, res)=>{
        try{
            req.user.tokens = []
            await req.user.save()
            res.status(200).send({
                apiStatus:true, data:"", message:"logged out"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus:false,
                errors:e.message,
                message:"error in Logout"
            }) 
        }

    }    
    static profile = (req, res)=>{
        res.status(200).send({data:req.user, apiStatus:true, message:"profile fetched"})
    }    

    static changePass = async (req, res)=>{
        try{
            req.user.password = req.body.password
            await req.user.save()
            res.status(200).send({
                  apiStatus:true, message:"Passoword Changed"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus:false,
                errors:e.message,
                message:"error in Change Password"
            }) 
        }
    }
    static profileImg = async(req,res)=>{
        req.user.image = req.file.path
        await req.user.save()
        res.status(200).send({
            apiStatus:true,
            data: req.file,
            message:"uploaded"
        })
    }

    static editImg = async(req,res)=>{
        const img = req.user.image
        if(!img) req.user.image = req.file.path
        else {
            fs.unlink(req.user.image, function (err) {            
                if (err) {                                                 
                    console.error(err);                                    
                }    
            })
            req.user.image = req.file.path
        }
        await req.user.save()
        res.status(200).send({
            apiStatus:true,
            data: req.file,
            message:"uploaded"
        })
    }
}

module.exports = User