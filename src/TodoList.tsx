import React, { useState } from "react";
import { Todo } from "./types.ts";

export const TodoList = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);

  const handleCheckbox = (id: number) => {
    setTodoList((prev) =>
      prev.map((todo) => todo.id === id ? { ...todo, done: !todo.done } : todo)
    );
  };

  const handleEdit = (id: number) => {
    setTodoList((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isBeingEdited: !todo.isBeingEdited } : todo
      )
    );
  };

  const todoElements = todoList.map((todo) => {
    return (
      <li key={todo.id} className="list-row">
        <input
          type="checkbox"
          checked={todo.done}
          className="checkbox my-auto"
          onChange={() => handleCheckbox(todo.id)}
        />
        <div className="text-xl">
          {todo.title}
        </div>
        <p className="list-col-wrap text-xs">{todo.detail}</p>
        <button
          type="button"
          className="btn btn-square btn-ghost  ml-auto whitespace-nowrap px-6"
          onClick={() => handleEdit(todo.id)}
        >
          {todo.isBeingEdited ? "Save" : "Edit"}
        </button>
      </li>
    );
  });

  const [todoTitle, setTodoTitle] = useState("");
  // let todoId: number = 0;
  const [todoId, setTodoId] = useState(0);

  // let deletedIds: number[] = [];
  const newTodo = (title: string, id: number): Todo => {
    const todo = {
      title: title,
      detail: "",
      done: false,
      isBeingEdited: false,
      id: id,
    };
    setTodoId(todoId + 1);
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
            onClick={() => {
              setTodoList([...todoList, newTodo(todoTitle, todoId)]);
            }}
          >
            Add
          </button>
        </li>
      </ul>
    </div>
  );
};
