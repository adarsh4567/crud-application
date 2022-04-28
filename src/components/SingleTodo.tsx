import React from "react";
import { Todo } from "../../model";
import {AiFillDelete, AiFillEdit} from 'react-icons/ai'
import {MdDone} from 'react-icons/md'
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
type Props = {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const SingleTodo = ({ todo, todos, setTodos }: Props) => {
    const [edit,setEdit]=useState<boolean>(false)
    const [editTodo,setEditTodo]=useState<string>(todo.todo)
    const handleDone = (id:number)=>{
        setTodos(todos.map((t)=>(
            t.id === id ? {...t, isDone:!t.isDone}:t
        )))
    }
    const handleDelete = (id:number)=>{
        setTodos(todos.filter((todo)=> todo.id !== id))
    }
   

    const handleSubmit = (e:React.FormEvent,id:number)=>
    {
        e.preventDefault();
        setTodos(
            todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
          );
          setEdit(false);
    }

    const input = useRef<HTMLInputElement>(null)

    useEffect(() => {
      input.current?.focus();
    }, [edit])
    
  return (
    <form className="todos__single" onSubmit={(e)=>handleSubmit(e,todo.id)}>
        {edit ? (
           <input ref={input} value={editTodo} className='todos__single--text' onChange={(e) => setEditTodo(e.target.value)}/>
        ):(
            todo.isDone ? (
                <s className="todos__single--text">{todo.todo}</s>
            ):<span className="todos__single--text">{todo.todo}</span>
        )}
      
      <div>
        <span className="icon"  onClick={() => {
            if (!edit && !todo.isDone) {
              setEdit(!edit);
            }
          }}>
            <AiFillEdit/>
        </span>
        <span className="icon" onClick={()=> handleDelete(todo.id)}>
            <AiFillDelete/>
        </span>
        <span className="icon" onClick={()=> handleDone(todo.id)}>
            <MdDone/>
        </span>
      </div>
    </form>
  );
};

export default SingleTodo;
