const productSchema=require("../model/productModel");
const fs = require('fs');
const path = require('path');
exports.getAllProduct=(requset,response,next)=>{
        productSchema.find()
        .sort({ id: 1 }) // Sort by "id" field in ascending order (1)
        .then(data=>{
                      response.status(200).json(data)
                    })
                    .catch(error=>next(error))
  }

exports.getProductById=(request,response,next)=>{
  productSchema.findOne({id:request.params.id})
  .then(data=>{
    if(data){
      response.status(200).json(data)
    }else{
      throw new Error(" Validation Product Error")
    }
    
  })
  .catch(error=>next(error))
    
 }
exports.addComment=(request,response,next)=>{
  console.log(request.body)
  console.log(request.body.comment)
  console.log(request.params.id)
  productSchema.updateOne(
    { id:request.params.id },
    { $push: { comments: request.body.comment } },
    console.log(request.body)
 ).then(data=>{
  response.status(200).json(data)
 })
 .catch(error=>next(error))
  }





  

  
 

//add Product
exports.addProduct = (request,response,next) => {

// Assuming you want to store the file paths in an array
   /*  const imagePaths = request.files['images'].map((file) => file.path); */
    // Multer successfully uploaded the image, now create the new product
    let newObject = new productSchema({
      title:request.body.title,
      description:request.body.description,
      price:request.body.price,
      discountPercentage:request.body.discountPercentage,
      rating:request.body.rating,
      stock:request.body.stock,
      brand:request.body.brand,
      category:request.body.category,
      thumbnail: request.files['thumbnail'][0] ? request.files['thumbnail'][0].path : '',
      images:request.files['images'].map((file) => file.path)
      // thumbnail: request.file ? request.file.path : '',
      // images: imagePaths
 
    });
 
    newObject
      .save()
      .then((data) => {
        response.status(201).json({ data: 'added', newObject: data });
      })
      .catch((error) => next(error));
  };


//deleted

exports.deleteProduct = (request, response, next) => {
  productSchema.findOne({id:request.params.id})
    .then((product) => {
      if (!product) {
        throw new Error("Product not found");
      }

      // Delete the associated images and thumbnails
      product.images.forEach((image) => {
        const imagePath = path.join(__dirname, '../', image); // Assuming 'uploads' is your upload directory
         
        fs.unlinkSync(imagePath); // Delete the file synchronously
      });
      // Delete the associated thumbnail image
      if (product.thumbnail) {
        const thumbnailPath = path.join(__dirname, '../', product.thumbnail); // Assuming the path is stored in the 'thumbnail' field
        fs.unlinkSync(thumbnailPath); // Delete the file synchronously
      }

      // Now, you can delete the product
      return productSchema.deleteOne({id:request.params.id});
    })
    .then(() => {
      response.status(201).json({ message: "Product deleted successfully" });
    })
    .catch((error) => next(error));
};


// updateProduct
exports.updateProduct = (request, response, next) => {
  const productId = request.params.id; // Assuming you pass the product ID in the request parameters

  // Define your custom query to find the product by your custom identifier
  const query = { id: productId }; // Replace 'customIdField' with the actual field name

  // Define the update object with the fields you want to change
 
  const update = {
    title: request.body.title,
    description: request.body.description,
    price: request.body.price,
    discountPercentage: request.body.discountPercentage,
    rating: request.body.rating,
    stock: request.body.stock,
    brand: request.body.brand,
    category: request.body.category,
  };
  
  // Check if 'thumbnail' and 'images' exist in the request.files object before updating
  if (request.files && request.files['thumbnail'] ) {
 
    update.thumbnail = request.files['thumbnail'][0].path;

          //delete the old file if a new one uploded
          productSchema.findOne(query)
      .then((existingProduct) => {
        if (!existingProduct) {
          return response.status(404).json({ error: 'Product not found' });
        }
  
        // Now, you can access the old thumbnail path from the existing product
        const oldThumbnailPath = existingProduct.thumbnail;
  
        // Log the old thumbnail path
        console.log('Old Thumbnail Path:', oldThumbnailPath);
        const thumbnailPath = path.join(__dirname, '../', oldThumbnailPath);
        fs.unlinkSync(thumbnailPath)
      })
  }
  if(request.files && request.files['images']){
    update.images = request.files['images'].map((file) => file.path);
    //delete the old file if a new one uploded
    productSchema.findOne(query)
    .then((existingProduct) => {
      if (!existingProduct) {
        return response.status(404).json({ error: 'Product not found' });
      }
   
      console.log(existingProduct.images)
      existingProduct.images.forEach((images) => {
          const imagePath = path.join(__dirname, '../', images); // Assuming 'uploads' is your upload directory
          fs.unlinkSync(imagePath); // Delete the file synchronously
      });
    })
  }
  // Use findOneAndUpdate with your custom query to update the product
  productSchema.findOneAndUpdate(
    query,
    update,
    { new: true } // This option returns the updated document
  )
    .then((updatedProduct) => {
      if (!updatedProduct) {
        return response.status(404).json({ error: 'Product not found' });
      }

 
    
      response.status(200).json({ data: 'updated', updatedProduct });
    })
    .catch((error) => next(error));
};






/* exports.deleteProduct=(request,response,next)=>{
  
  productSchema.deleteOne({id:request.params.id})
  .then((data)=>{
      if(data==null)
      throw new Error("Product not found")
      response.status(201).json({data})
  })
  .catch(error=>next(error))
} */

// id: Number,
// title: String,
// description: String,
// price: Number,
// discountPercentage: Number,
// rating: Number,
// stock: Number,
// brand: String,
// category: String,
// thumbnail: String,
// images: [String],
// comments:[String]