import React,{useState,useEffect} from 'react'
import './App.css'
import {AiOutlineDelete} from 'react-icons/ai'
import {BsCheckLg} from 'react-icons/bs'

import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [sShift, setsShift] = useState(false)
  const [todos,setTodos] = useState([])
  var [titles, setTitles] = useState("")
  var [descriptions, setDescriptions] = useState("")
  const [completedTodo,setCompletedTodo] = useState([])

  const handleTodo = (i) =>{

    if(!titles && !descriptions)
    {
      toast.error('Enter : Title |or| Description', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        // transition: Bounce,
        });
    }
    else if(!descriptions){
      toast.error('Enter :  Description', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        // transition: Bounce,
        });
    }
    else if(!titles)
    {
      toast.error('Enter : Title ', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        // transition: Bounce,
        });
    }
    else
    {
      let todoItems = {
        title: titles,
        description: descriptions
      }
  
      let updatedTodo = [...todos]
      updatedTodo.push(todoItems)
      setTodos(updatedTodo)
      localStorage.setItem('todolist',JSON.stringify(updatedTodo))
  
      setTitles("");
      setDescriptions("");
      document.getElementById('inputTitle').focus();
    }
  }

  const handleDelete = (i) =>{
    let reduceTodo = [...todos];
    reduceTodo.splice(i,1);
    localStorage.setItem('todolist',JSON.stringify(reduceTodo));
    setTodos(reduceTodo);
  }

  const handleComplete = (i) =>{
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth();
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn = dd + '/' + mm + '/' + yyyy + ' at ' + h + ':' + m + ':' + s;

    let filteredItem = {
      ...todos[i],
      completedOn:completedOn
    }

    let updatedCompletedArr = [...completedTodo];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodo(updatedCompletedArr);
    handleDelete(i)
    localStorage.setItem('completedTodo',JSON.stringify(updatedCompletedArr));
  }

  const handleDeletCompleted = (i) =>{
    let reduceTodo = [...completedTodo];
    reduceTodo.splice(i,1);
    localStorage.setItem('completedTodo',JSON.stringify(reduceTodo));
    setCompletedTodo(reduceTodo);
  }

  const handleKeyDown = (e) =>{
    if(e.key == 'Enter' && titles != "")
    {
      document.getElementById('inputDescription').focus()
    }
  }

  const handleOver = (e) =>{
    if(e.key == 'Enter' && titles != "" && descriptions != "")
    {
      handleTodo();
      document.getElementById('inputTitle').focus()
    }
    else if(e.key == 'Backspace' && descriptions == "")
    {
      document.getElementById('inputTitle').focus()
    }
  }

  useEffect(() => {
    document.getElementById('inputTitle').focus()
    let saveTodo = JSON.parse(localStorage.getItem('todolist'))
    let saveCompletedTodo = JSON.parse(localStorage.getItem('completedTodo'))
    if(saveTodo)
    {
      setTodos(saveTodo);
    }
    if(saveCompletedTodo)
    {
      setCompletedTodo(saveCompletedTodo);
    }
  }, [])
  

  return (
    <div>
      <h1>To Do List</h1>
      <div className="todo-container">
        <div className="todo-input-box">
          <div className='todo-input-items'>
            <label>Title</label>
            <input id='inputTitle' type="text" placeholder="What's the task Title?" value={titles} onChange={(e) => setTitles(e.target.value)} onKeyDown={handleKeyDown}/>
          </div>
          <div className='todo-input-items'>
            <label>Description</label>
            <input id='inputDescription' type="text" placeholder="What's the task Description?" value={descriptions} onChange={(e) => setDescriptions(e.target.value)} onKeyDown={handleOver}/>
          </div>
          <div className='todo-input-items'>
            <button className='add-button' onClick={handleTodo}>Add</button>
          </div>
        </div>

          <div className="btn-Area">
            <button className={`btn-todo secondary-btn ${!sShift && 'active'}`} onClick={() => setsShift(!sShift)}>To Do!</button>
            <button className={`btn-completed secondary-btn ${sShift && 'active'}`} onClick={() => setsShift(!sShift)}>Completed</button>
          </div>

          <div className="todo-list">
          {!sShift && todos.map((item,i) => {
              return(
                <div className="todo-list-items" key = {i}>
                  <div className='todoTexts'>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>

                  <div className='todpIcons'>
                    
                    <AiOutlineDelete className="icon" onClick={() => handleDelete(i)} title = "Wanna Delete?"/>
                    <BsCheckLg className="check-icon" onClick={() => handleComplete(i)} title = "You Completed !"/>

                  </div>

                </div>
              )
            })}

          {sShift && completedTodo.map((item,i) => {
              return(
                <div className="todo-list-items" key = {i}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p><small>Completed on: {item.completedOn}</small></p>
                  </div>

                  <div> 
                    <AiOutlineDelete className="icon" onClick={() => handleDeletCompleted(i)} title = "Delete?"/>
                  </div>

                </div>
              )
            })}
          </div>

      </div>
      <ToastContainer/>
    </div>
  )
}

export default App