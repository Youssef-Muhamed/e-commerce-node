const productController = require("../controller/product.controller")
const router = require("express").Router()
const authAdmin = require("../middleware/authAdmin")
const auth = require("../middleware/auth")
const upload = require("../middleware/productUpload")

router.post("/add",auth, productController.add)
router.post("/addcomment/:id",auth, productController.addComment)
router.post("/addrate/:id",auth, productController.addReview)

router.delete("/remove/:id",auth,productController.delWithToken)
router.delete("/delete/:id",authAdmin,productController.del)
router.delete("/deletecomment/:id/:coid",auth,productController.delComment)

router.get("/allproducts",authAdmin, productController.showAdmin)
router.get("/products",auth, productController.showUser)
router.get("/myProduct",auth, productController.myProduct)

router.patch("/approve/:id",authAdmin,productController.approve)
router.patch("/edit/:id",auth,productController.edit)


router.post("/productImg/:id", auth, upload.array('product'), productController.productImg)
module.exports = router