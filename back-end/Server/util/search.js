
const collection=require("../model/productModel");

module.exports = function (query){
  
    let q=query.toString();

    let pipeline = [
        {
          $search: {
            index: "searchProducts",
            text: {
              query: q,
              path: {
                wildcard: "*"
              }
            }
          }
        }
      ];
      return collection.aggregate(pipeline);
}