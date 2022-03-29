const productModel = require("../db/models/product.model")
const fs = require("fs")
class Product{
    static add = async (req,res)=>{
        try{
            const product = new productModel({ userId: req.user._id, ...req.body })
            await product.save()
            res.status(200).send({
                apiStatus:true,
                product,
                message:"product added"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus:false,
                errors:e.message,
                message:"error in add product"
            })
        }
    }
   
    static showAdmin = async (req,res)=>{
        try{
            const pro = await productModel.find()
            res.status(200).send({
            apiStatus:true,
            pro,
                message:"products"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus:false,
                errors:e.message,
                message:"error in show Product"
            })
        }
    }
    static showUser = async (req,res)=>{
        try{
            const pro = await productModel.find({approve:true})
            res.status(200).send({
            apiStatus:true,
            pro,
                message:"products"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus:false,
                errors:e.message,
                message:"error in show products"
            })
        }
    }
    
    static del = async(req,res)=>{
        try{
            const product = await productModel.findByIdAndDelete({_id:req.params.id})
            // fs.unlink(req.params.image, function (err) {            
            //     if (err) {                                                 
            //         console.error(err);                                    
            //     }    
            // })
            res.status(200).send({
                apiStatus:product,
                data:cat,
                message:"product deleted"
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
            const product = await productModel.findByIdAndDelete({_id:req.params.id,userId:req.user.id})
            res.status(200).send({
                apiStatus:true,
                data:product,
                message:"product deleted"
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

    static approve = async(req,res)=>{
        try{
            const pro = await productModel.findByIdAndUpdate(
                req.params.id, {approve:true}, {runValidators:true}
            )
            res.status(200).send({
                apiStatus:true,
                data:pro,
                message:"Product approved"
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

    static edit = async(req,res)=>{
        try{
            const pro = await productModel.findByIdAndUpdate(
                req.params.id, req.body, {runValidators:true}
            )
            res.status(200).send({
                apiStatus:true,
                data:pro,
                message:"Product apdated"
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

//   static editWithToken = async(req,res)=>{
//         try{
//             const pro = await productModel.findByIdAndUpdate(
//                 req.params.id, req.body, {runValidators:true}
//             )
//             res.status(200).send({
//                 apiStatus:true,
//                 data:pro,
//                 message:"category apdated"
//             })
//         }
//         catch(e){
//             res.status(500).send({
//                 apiStatus:false,
//                 errors:e.message,
//                 message:"error in updating"
//             })
//         }

//     }

    static myProduct = async(req,res)=>{
        try{
            await req.user.populate("userProduct")
            res.status(200).send({data: req.user.userProduct})
        }
        catch(e){
            res.status(500).send({erros:e.message})
        }
        
    }

    static productImg = async(req,res)=>{

        try{
            const product = await productModel.findById(req.params.id)
            product.images.push({image:req.file.path})
            await product.save()
            res.status(200).send({
                apiStatus:true,
                data: product,
                message:"uploaded"
            })
        }
        catch(e){
            res.status(500).send({erros:e.message})
        }
      
    }

    static addComment = async (req,res)=>{
        try{
            const product = await productModel.findById(req.params.id)
            product.comments.push({userId: req.user._id, comment:req.body.comment})
            
            await product.save()
            res.status(200).send({
                apiStatus:true,
                product,
                message:"comment added"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus:false,
                errors:e.message,
                message:"error in add comment"
            })
        }
    }
    static delComment = async (req,res)=>{
        try{
            const product = await productModel.findById(req.params.id)

            let comments =  product.comments
                comments = comments.filter(item => item._id != req.params.coid)
                await product.save()
            res.status(200).send({
                apiStatus:true,
                comments,
                message:"comment deleted"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus:false,
                errors:e.message,
                message:"error in delete comment"
            })
        }
    }
    static addReview = async (req,res)=>{
        try{
            const product = await productModel.findById(req.params.id)
            product.rating.push({userId: req.user._id, rate:req.body.rate})
            
            await product.save()
            res.status(200).send({
                apiStatus:true,
                product,
                message:"review added"
            })
        }
        catch(e){
            res.status(500).send({
                apiStatus:false,
                errors:e.message,
                message:"error in add review"
            })
        }
    }
}
module.exports = Product