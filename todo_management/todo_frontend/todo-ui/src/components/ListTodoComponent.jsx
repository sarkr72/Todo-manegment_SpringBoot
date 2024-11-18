import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { completeTodo, deleteTodo, getAllTodos, InCompleteTodo } from '../services/TodoService';

const ListTodoComponent = () => {
    const [toDos, setTodos] = useState([])
    const navigator = useNavigate();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        getTodos();
    }, [])

    const getTodos =()=>{
        getAllTodos().then((response) => {
            setTodos(response.data);
        }).catch(error => {
            console.error("not found");
        })
    }

    useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const marginStyle = windowWidth > 1000 ? { marginLeft: '5px' } : { marginTop: '5px' }; // Adjust 768 as per your breakpoints


    function addNewTodo(){
        navigator('/add-todo');
    }

    const updateTodo = (id) =>{
        navigator(`/edit-todo/${id}`);
    }

    const removeTodo = (id) =>{
                deleteTodo(id)
          .then((response) => {
            getTodos();
          })
          .catch((error) => {
            console.log(error =>{
              console.log(error);
            });
          });
    }

    const markCompleteTodo =(todo) =>{
      if(todo.completed){
      InCompleteTodo(todo.id).then((response) => {
        getTodos();
      }).catch(error =>{
        console.log(error);
      })
      }else{
      completeTodo(todo.id).then((response) => {
        getTodos();
      }).catch(error =>{
        console.log(error);
      })
    }
    }

  return (
    <div className='container'>
        <h2>List of Todos</h2>
        <button className='btn btn-primary mb-2' onClick={addNewTodo}>Add Todo</button>
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>Todo Title</th>
                    <th>Todo Description</th>
                    <th>Todo Completed</th>
                </tr>
            </thead>
                <tbody>
                {
                    toDos.map(todo => 
                        <tr key={todo.id}>
                            <td>{todo.title}</td>
                            <td>{todo.description}</td>
                            <td>{todo.completed ? "Yes" : "No"}</td>
                            <td className=''>
                                <button className='btn btn-info' style={{width: "90px"}} onClick={() => updateTodo(todo.id)}>Update</button>
                               <button className='btn btn-danger' style={{ ...marginStyle, width: "90px" }} onClick={() => removeTodo(todo.id)}>Delete</button>
                              <button className='btn btn-success' onClick={() => markCompleteTodo(todo)}>{todo.completed ? "Incomplete" : "Complete"}</button>
                            </td>
                        </tr>
                    )
                }
                </tbody>
        </table>
    </div>

  )
}

export default ListTodoComponent