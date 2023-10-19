const express=require("express");
const controller=require("../controller/orderController");
const router=express.Router();




router.route("/order")
      .post(controller.order)
      
module.exports=router;


