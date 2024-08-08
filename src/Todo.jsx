import React, { useReducer, useState, useRef } from 'react'
import './Todo.css'
import { FaTrash } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
const ADD = "ADD"
const DELETE = "DELETE"

const initialTodos=[]
const reducer = (state, action) => {
  switch (action.type) {
    case "COMPLETE":
      return state.map((todo) =>{
          return todo
      })
    case ADD:
      return [action.todo, ...state];
    case "EDIT":
      return state.map((todo) => {
          return todo;
        }
      );
      case DELETE:
      return state.filter((todo) => todo.id !== action.id);
    case "DELETE_ALL":
      return [];
    case "DELETE_DONE":
      return state.filter((todo) => todo.id !== action.id);
    case "FILTER":
      console.log({ state, action });
      if (action.filter === "ALL") {
        return state;
      } else if (action.filter === "DONE") {
        return state.filter((todo) => todo.complete);
      } else if (action.filter === "UN_DONE") {
        return state.filter((todo) => !todo.complete);
      }
    default:
      return state;
    }}
export const Todos = () => {
  const [todos, dispatch] = useReducer(reducer, initialTodos);
  const copiedTodos = [...todos];
  const titleInputRef = useRef();
  const [todo, setTodo] = useState(null);
  const [filter, setFilter] = useState("ALL");

  const handleComplete = (todo) => {
    dispatch({ type: "COMPLETE", id: todo.id });
  };


  const handleAdd = (event) => {
    event.preventDefault()
    let { value } = titleInputRef.current;
    if (value) {
      const todo = {
        id: todos.length + 1, title: value, complete: false,
      };
      dispatch({ type: ADD, todo: todo });
      titleInputRef.current.value=""
    } else {
      alert("To add a todo please enter todo title first!");
    }
  };
  const handleDelete = (id) => {
    const isAllowDelete = window.confirm(
      `Are you sure? you want to delete this todo with id (${id})`
    );
    if (isAllowDelete) {
      dispatch({ type: DELETE, id: id });
    }
  };
  const handleEdit = (e, id) => {
    let t =todo.filter(i=>i.id===id)
    setTodo(t[0].todo)
    // setTodo(todo);
    dispatch({ type: "EDIT", id: todo.id });
  };
  const handleDeleteAll = () => {
    const isAllowDelete = window.confirm(
      `Are you sure? You want to delete all todos?`
    );
    if (isAllowDelete) {
      dispatch({ type: "DELETE_ALL" });
    }
  };
  const handleDeletDone = () => {
    dispatch({ type: "DELETE_DONE" });
  };
  const handleFilter = (selectedFilter) => {
    console.log("selectedFilter", selectedFilter);
    dispatch({ type: "FILTER", filter: selectedFilter });
  };
  return (
    <div className='container'>
      <h1 style={{ textAlign: "center" }}>Todo Input</h1>
      <form onSubmit={handleAdd} >
        <div className='input'>
          <input type="text" placeholder='New Todo' id='title' ref={titleInputRef} />
          <button>Add New Task</button>
        </div>
      </form>
      <h1 style={{ textAlign: "center" }}>Todo List</h1>
      <div className='buttons'>
        <button onClick={() =>  handleFilter("ALL")}>All</button>
        <button onClick={() => handleFilter("Done")}>Done</button>
        <button onClick={() =>  handleFilter("UN-DONE")}>Undone</button>
      </div>
      {copiedTodos.length > 0 ? (
        copiedTodos.map((todo, index) => {
          return (
            <div className='todo-label' >
              <label style={{
                ...(todo.complete && {
                  textDecoration: "line-through",
                  color: "red",
                }),
              }}>
                {index+1}-{todo.title}
                
              </label>
              <div>
                {todos.map( todos => (
                  <div key={todos.id}>
                    <input type="checkbox" checked={todos.complete} onChange={() => handleComplete(todos.id)}/>
                    <MdModeEdit size={25} color='orange' style={{ cursor: "pointer" }} onClick={()=>handleEdit}/>
                    <FaTrash size={25} color='red' style={{ cursor: "pointer" }} onClick={() => handleDelete(todo.id)} />
                  </div>
                )
                )}

              </div>
            </div>
          )
        })
      ) : (
        <h5 style={{ color: "gray" }}>There is no Todo's yet . Please add from the above.</h5>
      )}



      <div className='delete-btn'>
        <button onClick={handleDeletDone}>Delete Done Tasks</button>
        <button onClick={handleDeleteAll}>Delete All Tasks</button>
      </div>
    </div>
  );

}


