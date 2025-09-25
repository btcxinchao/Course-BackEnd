const express = require('express');
const router = express.Router();
//multer 
const multer  = require('multer')

//helpers
const storageHelpes = require("../../helpers/storage.js")
const upload = multer({ storage : storageHelpes() })


const controller = require("../../controller/admin/products_controller")

router.get("/",controller.Product)
router.patch("/change-status/:status/:id",controller.changeStatus)
router.patch("/change-multi/",controller.changeStatusMulti)
router.delete("/delete/:id",controller.deleteOneItem)
router.get("/create",controller.create)
router.post("/create",upload.single('thumbnail'),controller.createPost)
router.get("/edit/:id", controller.edit)
router.patch("/edit/:id",upload.single('thumbnail') ,controller.editPatch)

router.get("/detail/:id", controller.Detail)
module.exports = router;