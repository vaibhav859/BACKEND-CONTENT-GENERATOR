const mongoose=require("mongoose")

const connectDB=async()=>{
    try{
const conn=await mongoose.connect("mongodb+srv://vaibhavchuttani290902:KwvLpHIIbjjP589J@clusterchatgpt.f7qpq.mongodb.net/?retryWrites=true&w=majority&appName=ClusterCHATGPT");
console.log("Mongo DB connected Succesfully")
    }
    catch(error)
    {
        console.log("Error connecting")
process.exit(1);
    }
}
module.exports=connectDB