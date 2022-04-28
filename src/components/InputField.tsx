import React from 'react'
import { useRef } from 'react'
import './styles.css'

interface Props {
    todo:string,
    setTodo:React.Dispatch<React.SetStateAction<string>>,
    handleAdd:(e:React.FormEvent)=> void
}
const InputField = ({todo,setTodo,handleAdd}:Props) => {
    const input = useRef<HTMLInputElement>(null)
  return (
    <form className='input' onSubmit={(e)=>{handleAdd(e)
    input.current?.blur()}}>
      <input type='text' ref={input} value={todo} onChange={(e)=> setTodo(e.target.value)} placeholder='enter your task' className='input__box'></input>
      <button className='input__submit' type='submit'>Go</button>
    </form>
  )
}

export default InputField