import React, { useState } from "react";
import { Todo } from "./types.ts";

export const TodoList = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const todoElements = todoList.map((todo) => (
    <li key={todo.id} className="list-row">
      <div>
        {todo.title}
      </div>
    </li>
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
    <div className="m-8">
      <ul className="list bg-base-100 max-w-md mx-auto rounded-box shadow-md">
        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
          Todo list
        </li>
        {todoElements}
        <li className="join p-4">
          <label className="input join-item">
            <input
              type="text"
              value={todoTitle}
              onChange={(e) => setTodoTitle(e.target.value)}
            />
          </label>
          <button
            className="btn btn-accent join-item"
            type="button"
            disabled={todoTitle === ""}
            onClick={() => setTodoList([...todoList, newTodo(todoTitle)])}
          >
            Add
          </button>
        </li>
      </ul>
    </div>
  );
};
