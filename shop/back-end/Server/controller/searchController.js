
const search=require("../util/search");

exports.search=(requset,response,next)=>{
    let query = requset.query.q;
    search(query)
  .then(data=>{
    response.status(200).json(data)
  })
  .catch(error=>next(error))
  }

