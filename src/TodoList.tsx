import React, { useState } from "react";
import { Todo } from "./types.ts";

export const TodoList = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const todoElements = todoList.map((todo) => (
    <li key={todo.id}>{todo.title}</li>
  ));
  const [todoTitle, setTodoTitle] = useState("");
  let id: number = 0;
  // let deletedIds: number[] = [];
  const newTodo = (title: string) => {
    const todo = { title: title, id: id };
    id += 1;
    return todo;
  };
  return (
    <div className="m-4">
      <ul className="list bg-base-100 rounded-box shadow-md">
        {todoElements}
      </ul>

      <input
        type="text"
        value={todoTitle}
        onChange={(e) => setTodoTitle(e.target.value)}
      />
      <button
        className="btn btn-primary m-4"
        type="button"
        disabled={todoTitle === ""}
        onClick={() => setTodoList([...todoList, newTodo(todoTitle)])}
      >
        Add
      </button>
    </div>
  );
};
