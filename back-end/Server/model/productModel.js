const mongoose = require("mongoose");
const Counter = require('./counter'); // Assuming the counter model is in a separate file
const schema=mongoose.Schema({
  id: Number,
  title: String,
  description: String,
  price: Number,
  discountPercentage: Number,
  rating: Number,
  stock: Number,
  brand: String,
  category: String,
  // thumbnail:{data:Buffer,contentType: String},
  thumbnail:String,
  images: [String],
  comments:[String]
});
// Middleware to auto-increment the productId field
schema.pre('save', function (next) {
  const doc = this;
  if (doc.isNew) {
    Counter.findOneAndUpdate(
      { model: 'Product', field: 'id' },
      { $inc: { count: 1 } },
      { new: true, upsert: true }
    )
      .then((counter) => {
        doc.id = counter.count+100;
        next();
      })
      .catch((error) => next(error));
  } else {
    next();
  }
});

module.exports=mongoose.model("products",schema);