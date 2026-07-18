const express=require("express");
const app=express();

app.get("/",(req,res)=>{
    res.send("hello world");
});

app.get("/students",(req,res)=>{
    res.json([
    {
        name:"joo",
        id:1
    },
    {
       name:"a",
       id:2
    },
    ]);
});

app.listen(3000,()=>{
    console.log("server running on port 3000");
});


