const express=require("express");
const controller=require("../controller/productController");
const validator=require("../middleware/validator");
const upload=require('../middleware/uplaod')
const router=express.Router();
router.route("/product")
      .get(controller.getAllProduct)
      .post(upload.fields ([
                  { name: 'thumbnail', maxCount: 1 },
                  { name: 'images', maxCount: 5 },
      ]),controller.addProduct)
      //.post(upload.single('thumbnail'),upload.array('images', 3),controller.addProduct)
       

router.route("/product/delete/:id")
      .delete(controller.deleteProduct)


router.route("/product/:id")
      .get(controller.getProductById)
      .post(controller.addComment)
      .patch(upload.fields ([
            { name: 'thumbnail', maxCount: 1 },
            { name: 'images', maxCount: 5 },
            ]),controller.updateProduct)

            
module.exports=router;