const categoryModel = require("../db/models/category.model")
const productModel = require("../db/models/product.model")
class Category{
    static add = async (req,res)=>{
        try{
            const cat = new categoryModel(req.body)
            await cat.save()
            res.status(200).send({
                apiStatus:true,
            cat,
                message:"category added"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus:false,
                errors:e.message,
                message:"error in add category"
            })
        }
    }

    static show = async (req,res)=>{
        try{
            const cat = await categoryModel.find()
            res.status(200).send({
            apiStatus:true,
            cat,
                message:"categories"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus:false,
                errors:e.message,
                message:"error in show category"
            })
        }
    }

    static showSub = async (req,res)=>{
        try{
            const cat = await categoryModel.find({parent:req.params.id})
            res.status(200).send({
            apiStatus:true,
            cat,
                message:"categories"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus:false,
                errors:e.message,
                message:"error in show category"
            })
        }
    }

    static del = async(req,res)=>{
        try{
            const cat = await categoryModel.findByIdAndDelete({_id:req.params.id,parent:req.params.id})
            await categoryModel.deleteMany({parent:req.params.id})
            await productModel.deleteMany({catId:req.params.id})
            res.status(200).send({
                apiStatus:true,
                data:cat,
                message:"category deleted"
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
            const cat = await categoryModel.findByIdAndUpdate(
                req.params.id, req.body, {runValidators:true}
            )
            res.status(200).send({
                apiStatus:true,
                data:cat,
                message:"category apdated"
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
}
module.exports = Category