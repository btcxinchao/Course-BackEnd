const express = require('express');
const router = express.Router();

const product_controller = require("../../controller/client/product_controller")

 router.get("/",product_controller.products )
 router.get("/:slug",product_controller.Detail )



module.exports = router;