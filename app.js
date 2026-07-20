const express=require("express");
const app=express();
app.use(express.json());

let students=[
    {
        id:1,
        name:"joo"
    },
    {
        id:2,
        name:"jothika"
    }
];

app.get("/",(req,res)=>{
    res.send("hello world");
});

app.get("/students",(req,res)=>{
    res.json(students);
});

app.get("/students/:id",(req,res)=>{
    const id=Number(req.params.id);
    const student=students.find((student) => student.id===id);
    if(!student){
        return res.status(404).json({
               message:"student not found"
            })
    };
    res.json(student);
})

app.put("/students/:id",(req,res)=>{
    const id=Number(req.params.id);
    const student=students.find((student)=> student.id===id);
    if(!student){
        return res.status(404).json({
            message:"student not found"
        });    
    }
    student.name=req.body.name
    res.status(200).json({
        message:"student updated successfully"
    });

})

app.post("/students", (req,res)=>{
    const new_student={
        id:students.length +1,
        name:req.body.name
    };
    students.push(new_student);
    res.status(201).json({
        message:"student created successfully"
    });
});

app.delete("/students/:id",(req,res)=>{
    const id=Number(req.params.id);
    const student=students.find(student=> student.id===id);
    if(!student){
        return res.status(404).json({
            message:"student not found"
        });
    };
    students=students.filter(student=> student.id!==id);
    res.status(200).json({
        message:"student deleted successfully"
    });
});

app.listen(3000,()=>{
    console.log("server running on port 3000");
});


