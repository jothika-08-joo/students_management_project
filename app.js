const express=require("express");
const app=express();
app.use(express.json());
const pool=require("./db");


app.get("/",(req,res)=>{
    res.send("hello world");
});

app.get("/students",async (req,res)=>{
    try{
        const result=await pool.query("select * from students");
        res.json(result.rows);
    }catch(err){
        console.error(err)
        res.status(500).json({
            message:"database error"
        });
    }
});

app.get("/students/:id",async(req,res)=>{
    try{
    const id=Number(req.params.id);
    const result=await pool.query("select * from students where id=($1)",
    [id]
    );
    if (result.rows.length===0){
        return res.status(404).json({
            message:"student not found"
        });
    }    
    res.json(result.rows[0])    
    } catch (err){
        console.error(err)
        res.status(500).json({
            message:"database error"
        });

    }
    

});

app.put("/students/:id",async(req,res)=>{
    try{
        const id=Number(req.params.id);
        const name=req.body.name
        const  result=await pool.query("update students set name=$1 where id=$2 returning *",
        [name,id]);
        if(result.rows.length===0){
            return res.status(404).json({
                message:"student not found"
            });
        }    
        res.status(200).json({
            message:"student updated successfully",
            result:result.rows[0]
        });    
    } catch(err){
        console.error(err)
        res.status(500).json({
            message:"database error"
        });
    }
})
app.post("/students", async(req,res)=>{
    try{
        await pool.query("insert into students (name) values($1)",
        [req.body.name]);
        res.status(201).json({
            message:"student created successfully"
        });
    }catch(err){
        console.error(err);
        res.status(500).json({
            message:"database error"
        });
    }
    

});

app.delete("/students/:id",async(req,res)=>{
    try{
        const id=Number(req.params.id);
        const result=await pool.query("delete from students where id=$1 returning *",
            [id]
        );
        if(result.rows.length===0){
            return res.status(404).json({
                message:"student not found"
            });
        }
        res.status(200).json({
            message:"student deleted successfully",
            result:result.rows[0]
        })
    }catch(err){
        console.error(err)
        res.status(500).json({
            message:"database error"
        });
    }
    
});

app.listen(3000,()=>{
    console.log("server running on port 3000");
});


