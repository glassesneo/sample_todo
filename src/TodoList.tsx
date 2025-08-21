import React, { useReducer } from "react";
import { Todo, TodoId } from "./types.ts";

type TodoAction =
  | { type: "add" }
  | { type: "check"; id: TodoId }
  | { type: "edit"; id: TodoId }
  | { type: "changeTitle"; title: string };

type TodoList = { [key: TodoId]: Todo };

type TodoState = {
  todoList: TodoList;
  newTitle: string;
  nextId: TodoId;
};

const newTodo = (title: string, id: TodoId): Todo => {
  const todo = {
    title: title,
    detail: "",
    done: false,
    isBeingEdited: false,
    id: id,
  };
  return todo;
};

const updateTodoList = (
  todoList: TodoList,
  id: TodoId,
  todo: Todo,
): TodoList => {
  return {
    ...todoList,
    [id]: todo,
  };
};

const todoListReducer = (state: TodoState, action: TodoAction): TodoState => {
  switch (action.type) {
    case "add": {
      const newState = {
        ...state,
        newTitle: "",
        nextId: state.nextId + 1,
        todoList: updateTodoList(
          state.todoList,
          state.nextId,
          newTodo(state.newTitle, state.nextId),
        ),
      };
      return newState;
    }

    case "check": {
      const newState = {
        ...state,
        todoList: updateTodoList(
          state.todoList,
          action.id,
          {
            ...state.todoList[action.id],
            done: !state.todoList[action.id].done,
          },
        ),
      };
      return newState;
    }

    case "edit": {
      const newState = {
        ...state,
        todoList: updateTodoList(
          state.todoList,
          action.id,
          {
            ...state.todoList[action.id],
            isBeingEdited: !state.todoList[action.id].isBeingEdited,
          },
        ),
      };
      return newState;
    }

    case "changeTitle": {
      const newState = {
        ...state,
        newTitle: action.title,
      };
      return newState;
    }

    default:
      return state;
  }
};

export const TodoList = () => {
  const initialTodoListState: TodoState = {
    todoList: {},
    newTitle: "",
    nextId: 0,
  };
  const [todoListState, todoListDispatch] = useReducer(
    todoListReducer,
    initialTodoListState,
  );

  const onClickCheckbox = (id: TodoId) => {
    todoListDispatch({ type: "check", id: id });
  };

  const onClickEdit = (id: TodoId) => {
    todoListDispatch({ type: "edit", id: id });
  };

  const onClickAdd = () => {
    todoListDispatch({ type: "add" });
  };

  const onChangeNewTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    todoListDispatch({ type: "changeTitle", title: e.target.value });
  };

  const listToElements = (todo: Todo) => {
    return (
      <li key={todo.id} className="list-row">
        <input
          type="checkbox"
          checked={todo.done}
          className="checkbox my-auto"
          onChange={() => onClickCheckbox(todo.id)}
        />
        <div className="text-xl">
          {todo.title}
        </div>
        <p className="list-col-wrap text-xs">{todo.detail}</p>
        <button
          type="button"
          className="btn btn-square btn-ghost  ml-auto whitespace-nowrap px-6"
          onClick={() => onClickEdit(todo.id)}
        >
          {todo.isBeingEdited ? "Save" : "Edit"}
        </button>
      </li>
    );
  };

  return (
    <div className="m-8">
      <ul className="list bg-base-100 max-w-md mx-auto rounded-box shadow-md">
        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
          Todo list
        </li>
        {Object.values(todoListState.todoList).map(listToElements)}
        <li className="join p-4">
          <label className="input join-item">
            <input
              type="text"
              value={todoListState.newTitle}
              onChange={onChangeNewTitle}
            />
          </label>
          <button
            className="btn btn-accent join-item"
            type="button"
            disabled={todoListState.newTitle === ""}
            onClick={onClickAdd}
          >
            Add
          </button>
        </li>
      </ul>
    </div>
  );
};
