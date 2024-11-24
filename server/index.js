import express from "express";
import cors from "cors";
import {pool} from "./db.js";
const app=express();
const port=5000;

//middlewere
app.use(cors());
app.use(express.json());//req.body

//routes

//create a todo 
app.post("/todos",async(req,res)=>{
try {
    const {description} = req.body;
    const newTodo = await pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING *",
        
        [description] );
    res.json(newTodo.rows[0]);
} catch (err) {
    console.error(err.message);
}
});
//get all todo
app.get("/todos",async(req,res)=>{
    try {
        const allTodos=await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message)
    }

});
//get a todo
app.get("/todos/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        const todo=await pool.query("SELECT * FROM todo WHERE todo_id=$1",[id]);
        console.log(req.params);
        res.json(todo.rows[0]);
    } catch (err) {
        console.error(err.message)
    }
})
//update a todo
app.put("/todos/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        const {description}=req.body;
        const updateTodo=await pool.query("UPDATE todo SET description=$1 WHERE todo_id=$2",[description,id]);
        res.json("todo was updated");
    } catch (err) {
        console.error(err.message);
    }
})
//delete a todo
app.delete("/todos/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        const deleteTodo=await pool.query("DELETE FROM todo WHERE todo_id=$1",[id]);
        console.log(req.params);
        res.json("TODO was deleted");
    } catch (err) {
       console.log(err.message);
    }
})

//server starter
app.listen(port,()=>{
    console.log("the server started");
})