const userSchema=require("./../model/userModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");

module.exports.signup = async (requset, response, next) => {
  try {
    const { email, password, firstName, lastName, createdAt } = requset.body;
    const existingUser = await userSchema.findOne({ email });
    if (existingUser) {
      return response.json({ message: "already registered" });
    }
    const user = await userSchema.create({ email, password, firstName, lastName, createdAt });
    const token = createSecretToken(user);
    
    response.setHeader('token',  token);
    response.status(201).json({ message: 'register successfully' , data: token});
   
  } catch (error) {
    console.error(error);
  }
};



module.exports.login = async (request, response, next) => {
  try {
    const { email, password } = request.body;
    
    const user = await userSchema.findOne({ email });
    if(!user){
      return response.json({message: 'please signup' }) 
    }
    const auth = await bcrypt.compare(password,user.password)
    if (!auth) {
      return response.json({message: 'wrong password' }) 
    }
     const token = createSecretToken(user);
    
     response.setHeader('token', token);
     response.status(200).json({ message: 'success' , data: token});
    
     
  } catch (error) {
    console.error(error);
  }
}

