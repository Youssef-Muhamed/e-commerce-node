const userController = require("../controller/user.controller")
const upload = require("../middleware/fileUpload")
const router = require("express").Router()
const auth = require("../middleware/auth")
const authAdmin = require("../middleware/authAdmin")

router.post("/register", userController.add)
router.post("/login", userController.login)
router.post("/admin", userController.loginAdmin)

//logout
router.post("/logout",auth, userController.logOut)
//logout All devices
router.post("/logoutAll",auth, userController.logOutAll)
//change password
router.post("/changePass",auth, userController.changePass)
//profile
router.post("/me",auth, userController.profile)
router.get('/all', authAdmin, userController.all)
router.get('/all/:id', authAdmin, userController.single)
router.delete('/all/:id', authAdmin, userController.del)
router.delete('/all', auth, userController.delWithToken)
router.patch('/all/:id', authAdmin, userController.edit)
router.patch('/all', auth, userController.editWithToken)



// Upload
router.post("/profileImg", auth, upload.single('profile'), userController.profileImg)
router.patch('/editimg', auth,upload.single('profile') ,userController.editImg)

module.exports = router