const productSchema=require("../model/productModel");
const fs = require('fs');
const path = require('path');
const cloudinary = require('../util/cloudinary')
const cron = require('node-cron');
const getCloudinaryPublicId = (url) => {
  const start = url.indexOf('/uploads/') + '/uploads/'.length;
  const end = url.lastIndexOf('.');
  
  return "uploads/"+url.substring(start, end);
};

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
      console.log(product.images)
      console.log(product.thumbnail)
      
      // Delete the associated images 
      const imageDeletionPromises = product.images.map((image) => {
        const publicId = getCloudinaryPublicId(image);
        console.log(publicId)

        return cloudinary.uploader.destroy(publicId, function(result) { console.log(result) });
      });


      // Delete the associated thumbnail  
      let thumbnailDeletionPromise = Promise.resolve();
      if (product.thumbnail) {
        const publicId =  getCloudinaryPublicId(product.thumbnail);
        console.log(publicId)
        thumbnailDeletionPromise = cloudinary.uploader.destroy(publicId, function(result) { console.log(result) });
      }

   
      // Wait for all deletions to complete
           return Promise.all([...imageDeletionPromises, thumbnailDeletionPromise])
           .then(() => {
             // Now, you can delete the product
             return productSchema.deleteOne({ id: request.params.id });
           });
       
    })
    .then(() => {
      response.status(201).json({ message: "Product deleted successfully" });
    })
    .catch((error) => next(error));
};


// updateProduct
exports.updateProduct = async (request, response, next) => {
  const productId = request.params.id; // Assuming you pass the product ID in the request parameters

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

  try {
    // Find the product by custom query
    const existingProduct = await productSchema.findOne({ id: productId });

    if (!existingProduct) {
      return response.status(404).json({ error: 'Product not found' });
    }

    // Check if 'thumbnail' exists in the request.files object before updating
    if (request.files && request.files['thumbnail']) {
      const oldThumbnailPath = getCloudinaryPublicId(existingProduct.thumbnail);
      await cloudinary.uploader.destroy(oldThumbnailPath);
      update.thumbnail = request.files['thumbnail'][0].path;
    }

    // Check if 'images' exist in the request.files object before updating
    if (request.files && request.files['images']) {
      const imagePaths = existingProduct.images.map((image) => getCloudinaryPublicId(image));
      for (const imagePath of imagePaths) {
        await cloudinary.uploader.destroy(imagePath);
      }
      update.images = request.files['images'].map((file) => file.path);
    }

    // Update the product using findOneAndUpdate
    const updatedProduct = await productSchema.findOneAndUpdate(
      { id: productId },
      update,
      { new: true } // This option returns the updated document
    );

    if (!updatedProduct) {
      return response.status(404).json({ error: 'Product not found' });
    }
    console.log('Product updated successfully')
    response.status(200).json({ data: 'updated', updatedProduct });
  } catch (error) {
    next(error);
  }
};



cron.schedule('0 * * * *', () => {
  console.log('Running deleteProductsGreaterThan30 task every hour');
  deleteProductsGreaterThan30();
});

 // Function to delete products with ID > 30
const deleteProductsGreaterThan30 = async () => {
  try {
    const products = await productSchema.find({ id: { $gt: 30 } });

    const deletionPromises = products.map(async (product) => {
      // Delete associated images
      const imageDeletionPromises = product.images.map((image) => {
        const publicId = getCloudinaryPublicId(image);
        return cloudinary.uploader.destroy(publicId);
      });

      // Delete associated thumbnail
      let thumbnailDeletionPromise = Promise.resolve();
      if (product.thumbnail) {
        const publicId = getCloudinaryPublicId(product.thumbnail);
        thumbnailDeletionPromise = cloudinary.uploader.destroy(publicId);
      }

      await Promise.all([...imageDeletionPromises, thumbnailDeletionPromise]);
      await productSchema.deleteOne({ id: product.id });
    });

    await Promise.all(deletionPromises);
    console.log('Products with ID > 30 deleted successfully');
  } catch (error) {
    console.error('Error deleting products:', error);
  }
};
