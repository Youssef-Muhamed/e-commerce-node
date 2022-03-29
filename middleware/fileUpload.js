const multer = require("multer")
const fs = require("fs")
const path = require("path")

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/users')
    },
    filename:function(req,file,cb){
        const myFileName  = file.fieldname +"_" + Date.now() + path.extname(file.originalname)
        cb(null,myFileName)
    }
})
const extensions = ['.jpg','.png','.gif']
const upload = multer({
    storage,
    fileFilter:function(req, file, cb){
        if(!extensions.includes(path.extname(file.originalname)))
             return cb(new Error("invalid file extension"))
        cb(null, true)
        }
})

module.exports = upload