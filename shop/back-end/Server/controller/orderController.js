const orderSchema=require("./../model/orderModel");


exports.order=(requset,response,next)=>{

  let newOrder= new orderSchema({
     order:requset.body,
  })

  newOrder.save()
          .then((data)=>{
            response.status(201).json(data)
          })
          .catch(error=>next(error))
  }
  
 


