import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { createTodo, getAllTodos, getTodo, updateTodo } from "../services/TodoService";

const TodoComponent = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(true);
  const [isCompleted, setIsCompleted] = useState("");
  const navigator = useNavigate();
  const { id } = useParams();

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    isCompleted: ""
  });

  useEffect(() =>{
        getTodos();
  }, [])

      const getTodos=()=>{
        getAllTodos().then((response) =>{
            setTodos(response.data);
        }).catch(error =>{
            console.log(error);
        })
    }

  useEffect(() => {
    if (id) {
      getTodo(id)
        .then((response) => {
          setTitle(response.data.title || "");
          setDescription(response.data.description || "");
          setIsCompleted(response.data.completed.toString() || "");
        }).catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  const saveOrUpdateTodo = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const completed = isCompleted === "No" ? false : true; 
      const todo = {title, description, completed};
      
      if (id) {
        updateTodo(id, todo)
          .then((resonse) => {
            navigator("/todos");
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        createTodo(todo).then((response) => {
          console.log(response.data);
          navigator("/todos");
        });
      }
    }
  };

  const validateForm = () => {
    let valid = true;

    const errorsCopy = { ...errors };

    if (title.trim()) {
      errorsCopy.title = "";
    } else {
      errorsCopy.title = "Title is required";
      valid = false;
    }
    if (description.trim()) {
      errorsCopy.description = "";
    } else {
      errorsCopy.description = "Description is required";
      valid = false;
    }
    if(isCompleted || !isCompleted){
      errorsCopy.isCompleted = "";
    }else{
      errorsCopy.isCompleted = "Completed is required";
      valid = false;
    }

    setErrors(errorsCopy);

    return valid;
  };

  const pagetitle = () => {
    if (id) {
      return <h2 className="text-center">Update Todo</h2>;
    } else {
      return <h2 className="text-center">Add Todo</h2>;
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="card">
          {pagetitle()}
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">Title:</label>
                <input
                  type="text"
                  placeholder="Enter Todo Title"
                  name="title"
                  value={title}
                  className={`form-control ${
                    errors.firstName ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setTitle(e.target.value)}
                ></input>
                {errors.title && (
                  <div className="invalid-feedback"> {errors.title} </div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Description:</label>
                <input
                  type="text"
                  placeholder="Enter Todo Description"
                  name="description"
                  value={description}
                  className={`form-control ${
                    errors.description ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setDescription(e.target.value)}
                ></input>
                {errors.description && (
                  <div className="invalid-feedback"> {errors.description} </div>
                )}
              </div>
                <div className="form-group mb-2">
                  <label>Completed?</label>
                <select className={`form-control ${errors.isCompleted ? "is-invalid" : ""}`} value={isCompleted} onChange={(e)=> setIsCompleted(e.target.value)}>
                      <option value={"Yes"}>{"Yes"}</option>
                      <option value={"No"}>{"No"}</option>
                </select>
                {errors.isCompleted && (
                  <div className="invalid-feedback"> {errors.isCompleted} </div>
                )}
              </div>
              <button
                className="btn btn-success"
                onClick={saveOrUpdateTodo}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoComponent;
