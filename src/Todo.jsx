import React { useReducer, useState, useRef } from 'react';
import './Todo.css';
import { FaTrash } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";

const ADD = "ADD";
const DELETE = "DELETE";
const COMPLETE = "COMPLETE";
const EDIT = "EDIT";
const DELETE_ALL = "DELETE_ALL";
const DELETE_DONE = "DELETE_DONE";
const FILTER = "FILTER";

const initialTodos = [];

const reducer = (state, action) => {
  switch (action.type) {
    case COMPLETE:
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, complete: !todo.complete } : todo
      );
    case ADD:
      return [action.todo, ...state];
    case EDIT:
      return state.map((todo) =>
        todo.id === action.todo.id ? { ...todo, title: action.todo.title } : todo
      );
    case DELETE:
      return state.filter((todo) => todo.id !== action.id);
    case DELETE_ALL:
      return [];
    case DELETE_DONE:
      return state.filter((todo) => !todo.complete);
    case FILTER:
      if (action.filter === "ALL") {
        return state;
      } else if (action.filter === "DONE") {
        return state.filter((todo) => todo.complete);
      } else if (action.filter === "UN_DONE") {
        return state.filter((todo) => !todo.complete);
      }
      return state;
    default:
      return state;
  }
};

export const Todos = () => {
  const [todos, dispatch] = useReducer(reducer, initialTodos);
  const titleInputRef = useRef();
  const [todo, setTodo] = useState(null);
  const [filter, setFilter] = useState("ALL");

  const handleComplete = (id) => {
    dispatch({ type: COMPLETE, id });
  };

  const handleAdd = (event) => {
    event.preventDefault();
    const { value } = titleInputRef.current;
    if (value) {
      const newTodo = { id: todos.length + 1, title: value, complete: false };
      dispatch({ type: ADD, todo: newTodo });
      titleInputRef.current.value = "";
    } else {
      alert("To add a todo please enter a title first!");
    }
  };

  const handleDelete = (id) => {
    const isAllowDelete = window.confirm(`Are you sure? You want to delete this todo with id (${id})`);
    if (isAllowDelete) {
      dispatch({ type: DELETE, id });
    }
  };

  const handleEdit = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    if (todoToEdit) {
      const newTitle = prompt("Edit the todo title:", todoToEdit.title);
      if (newTitle) {
        dispatch({ type: EDIT, todo: { ...todoToEdit, title: newTitle } });
      }
    }
  };

  const handleDeleteAll = () => {
    const isAllowDelete = window.confirm("Are you sure? You want to delete all todos?");
    if (isAllowDelete) {
      dispatch({ type: DELETE_ALL });
    }
  };

  const handleDeleteDone = () => {
    const isAllowDone = window.confirm("Are You Sure You want to delete done todos?")
    if (isAllowDone) {
    dispatch({ type: DELETE_DONE });
      
    }
  };

  const handleFilter = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "ALL") return true;
    if (filter === "DONE") return todo.complete;
    if (filter === "UN_DONE") return !todo.complete;
    return true;
  });

  return (
    <div className="container">
      <h1 style={{ textAlign: "center" }}>Todo Input</h1>
      <form onSubmit={handleAdd}>
        <div className="input">
          <input type="text" placeholder="New Todo" ref={titleInputRef} />
          <button type="submit">Add New Task</button>
        </div>
      </form>
      <h1 style={{ textAlign: "center" }}>Todo List</h1>
      <div className="buttons">
        <button onClick={() => handleFilter("ALL")}>All</button>
        <button onClick={() => handleFilter("DONE")}>Done</button>
        <button onClick={() => handleFilter("UN_DONE")}>Undone</button>
      </div>
      {filteredTodos.length > 0 ? (
        filteredTodos.map((todo, index) => (
          <div>
            <div key={todo.id} className="todo-label">
              <label
                style={{
                  ...(todo.complete && {
                    textDecoration: "line-through",
                    color: "red",
                  }),
                }}
              >
                {index + 1} - {todo.title}
              </label>
              <div>
                <input
                  type="checkbox"
                  checked={todo.complete}
                  onChange={() => handleComplete(todo.id)}
                />
                <MdModeEdit
                  size={25}
                  color="orange"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleEdit(todo.id)}
                />
                <FaTrash
                  size={25}
                  color="red"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDelete(todo.id)}
                />
              </div>

            </div>
            
          </div>
        ))
      ) : (
        <h5 style={{ color: "gray" }}>There are no todos yet. Please add from the above.</h5>
      )}
<div className="delete-btn">
              <button onClick={handleDeleteDone}>Delete Done Tasks</button>
              <button onClick={handleDeleteAll}>Delete All Tasks</button>
            </div>
    </div>
  );
};
