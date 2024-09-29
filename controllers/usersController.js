const User = require("../models/User")
const asyncHandler=require("express-async-handler")
    const jwt=require("jsonwebtoken")

const bcrypt=require("bcryptjs")

const register=asyncHandler( async(req,res,next)=>{

    const {username,email,password}=req.body
    if(!username || !email || !password)
    {
        res.status(400)
        throw new Error("PLease all fields are required");
    }
    const userExists=await User.findOne({email});
    if(userExists)
    {
        res.status(400);
        throw new Error("User Already Exists")
    }
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);
    
    const newUser=new User({
        username,
        password:hashedPassword,
        email,

    })
    newUser.trialExpires=new Date(
        new Date().getTime()+newUser.trialPeriod*24*60*60*1000
    )
    await newUser.save()
    res.json({
        status:true,
        message:"Registration was successfull",
        user:{
            username,
            email,
        }
    })
}


)
const login=asyncHandler(async(req,res)=>{
const {email,password}=req.body
const user=await User.findOne({email})
//console.log(user)
if(!user)
{
    res.status(401)
    throw new Error('Invalid email or password');
}
const isMatch=await bcrypt.compare(password,user?.password)

if(!isMatch)
{
    
    res.status(401)
   
    throw new Error('Invalid email or password');
}
const token=jwt.sign({id:user?.id},process.env.JWT_SECRET,{
    expiresIn:'3d'
})
console.log(token)
res.cookie('token',{
    httpOnly:true,
    secure:process.env.NODE_ENV==='production',
    sameSite:'strict',
    maxAge:24*60*60*1000


})
res.json({
    status:"success",
    _id:user?._id,
    message:"Login success",
    username:user?.username,
    email:user?.email,
})
})

const logout=asyncHandler(async(req,res)=>{
    res.cookie("token","",{maxAge:1});
    res.status(200).json({message:"Logged out successfully"});
})
const userProfile=asyncHandler(async(req,res)=>{
    const id="66e49936cdebfe46e9287302"
    const user= await User.findById(id).select('-password');
    if(user)
    {
        res.status(200).json({
            status:"success",
            user,
        })
    }
    else
    {
        res.status(400)
        throw new Error("User not Found");
    }
})

module.exports={
    register,
    login,
    logout,
    userProfile,
}