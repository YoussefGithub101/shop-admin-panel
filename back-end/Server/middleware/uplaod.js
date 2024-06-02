const path=require('path')
const multer = require('multer');
require('dotenv').config();
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('..//util/cloudinary') ;
 

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'uploads', // optional, specify the folder in Cloudinary
    //   format: async (req, file) => 'png', // supports promises as well
      public_id: (req, file) => Date.now() + path.extname(file.originalname), // The file on cloudinary would have the same name as the original file name but with a timestamp
    },
  });

  const storage1 = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/')
    },
    filename:function(req,file,cb){
        let ext = path.extname(file.originalname)
        cb(null,Date.now()+ ext)
    }
})

var upload= multer ({
    storage:storage
 
})

module.exports=upload
 













/* var upload= multer ({
    storage:storage,
    fileFilter: function (req,file,callback){
        if(
            file.mimetype =="image/png"||
            file.mimetype =="image/jpg"
        ){
            callback(null,true)
        }
        else{
            console.log('only jpg & png file supported!')
            callback(null,false)
        } 
    },limits:{
        fileSize:1024*1024*2
    }
}) */