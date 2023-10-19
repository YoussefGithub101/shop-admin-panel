const mongoose = require("mongoose");

const schema=mongoose.Schema({
  // userId: Number,
  // totalPrice: Number,
  // items: [{}],
  // createdAt: {
  //   type: Date,
  //   default: new Date(),
  // },
    order: {},

});


module.exports=mongoose.model("orders",schema);