import React, { useRef } from 'react'
import "./style.css"
interface InputProps {
  todo:string,
  setTodo:React.Dispatch<React.SetStateAction<string>>,
  handleAdd:(e:React.FormEvent)=>void,
}

const InputField = ({todo,setTodo,handleAdd}:InputProps) => {

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange=(e:React.FormEvent<HTMLInputElement>)=>{
    setTodo(e.currentTarget.value);
  }
  return (
    <form onSubmit={(e)=>{
      handleAdd(e);
      inputRef.current?.blur();
    }} className='input'>
        <input ref={inputRef} type="input" className="input__box" onChange={handleChange} placeholder='Enter a task' value={todo} />
        <button className='input_submit' type='submit'>Go</button>
    </form>
  )
}

export default InputField