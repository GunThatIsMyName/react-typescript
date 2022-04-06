import React, { useEffect, useRef, useState } from "react";
import { Todo } from "../model";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import "./style.css";
import { Draggable } from "react-beautiful-dnd";

interface Props {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  index: number;
}

const SingleTodo = ({ todo, todos, setTodos, index }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const handleDone = (id: number) => {
    const tempList = todos.map((item) => {
      if (item.id === id) {
        return { ...item, isDone: !item.isDone };
      }
      return item;
    });
    setTodos(tempList);
  };

  const handleDelete = (id: number) => {
    const tempDeleteList = todos.filter((todo) => todo.id !== id);
    setTodos(tempDeleteList);
  };

  const handleSubmit = (e: React.FormEvent, id: number) => {
    e.preventDefault();

    const tempSubmitList = todos.map((item) => {
      if (item.id === id) {
        return { ...item, todo: editTodo };
      }
      return item;
    });
    setTodos(tempSubmitList);
    setEdit(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <Draggable index={index} draggableId={todo.id.toString()} >
      {(provided)=>{
        return <form
        className="todos__single"
        onSubmit={(e) => handleSubmit(e, todo.id)}
        ref={provided.innerRef}
        {...provided.dragHandleProps}
        {...provided.draggableProps}
      >
        {edit ? (
          <input
            ref={inputRef}
            value={editTodo}
            className="todos__single--test"
            onChange={(e) => setEditTodo(e.target.value)}
          />
        ) : todo.isDone ? (
          <s className="todos__single--text">{todo.todo}</s>
        ) : (
          <span className="todos__single--text">{todo.todo}</span>
        )}
        <div>
          <span
            className="icon"
            onClick={() => {
              if (!edit && !todo.isDone) setEdit(!edit);
            }}
          >
            <AiFillEdit />
          </span>
          <span className="icon" onClick={() => handleDelete(todo.id)}>
            <AiFillDelete />
          </span>
          <span className="icon" onClick={() => handleDone(todo.id)}>
            <MdDone />
          </span>
        </div>
      </form>
      }}
    </Draggable>
  );
};

export default SingleTodo;
