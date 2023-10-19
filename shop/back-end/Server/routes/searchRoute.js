const express=require("express");
const controller=require("../controller/searchController");
const router=express.Router();




router.route("/search")
      .get(controller.search)
      
module.exports=router;


