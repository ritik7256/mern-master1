const express=require('express');
const app=express();
const mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/day1');
const studentSchema=new mongoose.Schema({
    name:String,
    age:Number,
    email:String,
    phoneNumber:Number,
})
const user=mongoose.model("students",studentSchema)
const cors=require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.get("/demo",async(req,res)=>{
    const data=await user.find()
    res.json(data);
})
app.post("/demo",async(req,res)=>{
    const User= new user();
    User.name=req.body.name;
    User.age=req.body.age;
    User.email=req.body.age;
    User.phoneNumber=req.body.number;
    const data=await User.save();
    console.log(data);

})

app.listen(8080,()=>{
    console.log('server started');

})