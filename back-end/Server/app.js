const express=require("express");
const morgan = require('morgan');
const multer  = require('multer')
const cors = require('cors');
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const productRouter=require("./routes/productRoute");
const userRouter=require("./routes/userRoute");
const searchRouter=require("./routes/searchRoute");
const orderRouter=require("./routes/orderRoute");
require('dotenv').config();

const server=express();

const port=process.env.PORT||8080;


mongoose.connect(process.env.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    server.listen(port,()=>{
    console.log("I am listening ... "+port);
});
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });





// Logger
// server.use(morgan(function (tokens, req, res) {
//     return [
//       tokens.url(req, res),
//       tokens.method(req, res),
//     ].join(' ')
// }))


// Cors

const corsOptions = {
    // origin: `http://127.0.0.1:${port}/`,
    origin: '*',
    optionsSuccessStatus: 200,
    credentials: true,
    allowedHeaders: ['Authorization', 'Content-Type','Origin', 'X-Requested-With','token']
  }
server.use(cors(corsOptions));




server.use(cookieParser());
// Routes
server.use(express.json());

server.use(searchRouter);
server.use(productRouter);
server.use(userRouter);
server.use(orderRouter);
server.use('/uploads',express.static('uploads'))



// 404 Not Found
server.use((req,res,next)=>{
    res.status(404).json({message: "Page not found"});
})




// Error 500
server.use((err,req,res,next)=>{
  console.error(err);

    res.status(500).json({message: "Internal Server Error"});
})