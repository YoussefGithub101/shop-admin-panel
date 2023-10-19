const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const schema=mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    createdAt: {
        type: Date,
        default: new Date(),
      }
});
schema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 12);
});
module.exports=mongoose.model("users",schema);