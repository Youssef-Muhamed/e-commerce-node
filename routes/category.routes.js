const categoryController = require("../controller/category.controller")
const router = require("express").Router()
const authAdmin = require("../middleware/authAdmin")

router.post("/add",authAdmin, categoryController.add)
router.post("/show",authAdmin, categoryController.show)
router.post("/showsub/:id",authAdmin, categoryController.showSub)
router.delete("/delete/:id",authAdmin, categoryController.del)
router.patch("/edit/:id",authAdmin, categoryController.edit)

module.exports = router