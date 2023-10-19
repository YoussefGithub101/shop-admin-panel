const express=require("express");
const controller=require("../controller/userController");
const validator=require("../middleware/validator");
const router=express.Router();

router.route("/login")
      .post(validator.validateLogin,controller.login)
      

router.route("/signup")
      .post(validator.validateSignup,controller.signup)


module.exports=router;