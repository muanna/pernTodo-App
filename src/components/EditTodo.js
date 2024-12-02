import React,{Fragment , useState} from "react";

const EditTodo = ({todo})=>{
    const [description,setDescription] = useState(todo.description);

const updateDescription=async e =>{
    e.preventDefault();
try {
    const body=await { description };
    const response=await fetch(`http://localhost:5000/todos/${todo.todo_id}`,{
            method: "PUT",
            headers: {"Content-Type" : "application/json"},
            body:JSON.stringify(body)
        });

        window.location="/";
} catch (err) {
    console.error(err.message);
}
}

    return(<Fragment>
        <button type="button" class="btn btn-info btn-warning" data-toggle="modal" data-target={`#id${todo.todo_id}`} onClick={()=>setDescription(todo.description)}>Edit</button>


<div id={`id${todo.todo_id}`} class="modal fade" role="dialog">
  <div class="modal-dialog">

    
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" onClick={()=>setDescription(todo.description)}>&times;</button>
        <h4 class="modal-title">Edit Todo</h4>
      </div>
      <div class="modal-body">
        <p><input type="text" className="form-control" value={description}
        onChange={e=>{
            setDescription(e.target.value);
        }}/></p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-warning" data-dismiss="modal"
        onClick={e=>updateDescription(e)}
        >Edit</button>
      </div>
    </div>

  </div>
</div>
    </Fragment>)
}
export default EditTodo;