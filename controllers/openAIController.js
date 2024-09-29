const asyncHandler=require('express-async-handler')
const axios=require('axios')
const { model } = require('mongoose')

const openAIController=asyncHandler(async(req,res)=>{
    const {prompt}=req.body
    try{
const response=await axios.post('https://api.openai.com/v1/completions',{
    model:'gpt-3.5-turbo-instruct',
    prompt,
    max_tokens:100
},{
    headers:{
Authorization:process.env.OPEN_API_KEY,
'Content-type':"application/json"
    }
})
console.log(response)
;    }
    catch(error)
    {

    }
})


module.exports={
    openAIController,
}