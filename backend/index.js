const express  = require("express");
const { createTodo, updateTodo } = require('./types');
const { todo } = require('./db');
const app = express();
const cors = require("cors");

const port =3000;
app.use(express.json());
app.use(cors());

app.post("/todo", async function(req,res){
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);
    if(!parsedPayload.success){
        res.status(411).json({
            msg:"You sent the wrong inputs"
        })
        return;
    }

    await todo.create({
        title : createPayload.title,
        description : createPayload.description,
        completed :false
    })

    res.json({
        msg : "Todo created"
    })

})

app.get("/todos",async function(req,res){
    const todos = await todo.find({})
    res.json({
        todos
    })
})

app.put("/completed",async function(req,res){
    const updatePayload = req.body;
    const parsedPayload = updatePayload.safeParse(updateTodo);
    if(!parsedPayload.success){
            res.json(411).json({
                msg:"You send the wrong input"
            })
    }

    await todo.update({
        _id : req.body.id
    },{
        completed : true
    }).json({
        msg:"Todo marked as completed"
    })

})

app.listen(port,()=>{
    console.log(`example app listening on port ${port}`);
})