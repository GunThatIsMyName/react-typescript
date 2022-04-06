import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Todo } from "../model";
import SingleTodo from "./SingleTodo";
import "./style.css";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList = ({
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos,
}: Props) => {
  return (
    <div className="container">
      <Droppable droppableId="TodosList">
        {(provided) => {
          return (
            <div
              className="todos"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <span className="todos__heading">Active Task</span>
              {todos.map((todo,index) => {
                return (
                  <SingleTodo
                    index={index}
                    key={todo.id}
                    todo={todo}
                    todos={todos}
                    setTodos={setTodos}
                  />
                );
              })}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
      <Droppable droppableId="TodosRemove">
        {(provided) => {
          return (
            <div
              className="todos remove"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <span className="todos__heading">Completed Task</span>
              {completedTodos.map((todo,index) => {
                return (
                  <SingleTodo
                    index={index}
                    key={todo.id}
                    todo={todo}
                    todos={todos}
                    setTodos={setTodos}
                  />
                );
              })}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </div>
  );
};

export default TodoList;
