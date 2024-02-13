const User = require("../models/user");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

async function signup(req,res){56
 try{ 
    //get the email and password off the req body
  const{email , password}=req.body;

  //hash password 
  const hashedPassword=bcrypt.hashSync(password,8); 
 
  //create a user with the data
  await User.create({email,password:hashedPassword});
 
  //respond 
  res.sendStatus(200);
 } catch(err){
 
    console.log(err);
    res.sendStatus(400);
 }
}

async function login(req,res){
    try{
    //get the email  and pass off the rq body
    const {email,password} =req.body;

    //find the user with requested mail
    const user=await User.findOne({email });
    if(!user) return res.sendStatus(401);  //if user does not exist then send status as 401

    //comapre sent in pass with found user pass hash
     const passwordMatch=bcrypt.compareSync(password, user.password);
     if(!passwordMatch) return res.sendStatus(401); //401 means unauthorised
    
     //create e jwt token
     const exp=Date.now() +1000 *60*60*24*30; //date now gives time in miliseconds so we have incresed it to 30 days mtlb 30 days baad ye cookie expire hoajeygi
    const token=jwt.sign({sub: user._id ,exp},"hello") //1st arguement is data we want to encrypt. 2nd is the secret key used to encrypt and decrypt it
   
    //set the cookie
    res.cookie("Authorization",token ,{    //user is going to send this token  int the form of cookie with every request and the server decodes it if its valid 
    
        expires: new Date(exp),
        httpOnly:true, //only the server and the browser can read the cookie 
        //sameSite:'lax',
    }) ;

    //send statud
    res.sendStatus(200);   
} catch(err){
    consol.log(err);
    return res.sendStatus(400);
}

}

function logout(req,res){
    try{
    //delete the cookie
    res.clearCookie("Authorization");

    res.sendStatus(200);
    } catch(err){
        console.log(err);
        return res.sendStatus(400);
    }

}

function checkAuth(req,res)
{  try{
   
    res.sendStatus(200);
}catch(err){
    console.log(err);
    return res.sendStatus(400);
}
 
}

module.exports={
    signup,
    login,
    logout,
    checkAuth,
};