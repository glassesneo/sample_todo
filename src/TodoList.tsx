import React, { useReducer } from "react";
import { Todo, TodoId } from "./types.ts";

type TodoAction =
  | { type: "add" }
  | { type: "check"; id: TodoId }
  | { type: "edit"; id: TodoId }
  | { type: "clear" }
  | { type: "changeTitle"; title: string };

type TodoList = Map<TodoId, Todo>;

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
  const newTodoList = new Map(todoList);
  newTodoList.set(id, todo);
  return newTodoList;
};

const todoListReducer = (state: TodoState, action: TodoAction): TodoState => {
  switch (action.type) {
    case "add": {
      const todo = newTodo(state.newTitle, state.nextId);
      const newState = {
        ...state,
        newTitle: "",
        nextId: state.nextId + 1,
        todoList: updateTodoList(
          state.todoList,
          state.nextId,
          todo,
        ),
      };
      console.log("todo", todo);
      console.log("todoListState", newState);
      return newState;
    }

    case "check": {
      const todo: Todo = state.todoList.get(action.id)!;
      const newState = {
        ...state,
        todoList: updateTodoList(
          state.todoList,
          action.id,
          {
            ...todo,
            done: !todo.done,
          },
        ),
      };
      return newState;
    }

    case "edit": {
      const todo: Todo = state.todoList.get(action.id)!;
      const newState = {
        ...state,
        todoList: updateTodoList(
          state.todoList,
          action.id,
          {
            ...todo,
            isBeingEdited: !todo.isBeingEdited,
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

    case "clear": {
      const filteredTodoList = new Map(
        Array.from(state.todoList).filter(([_, todo]) => !todo.done),
      );
      const newState = {
        ...state,
        todoList: filteredTodoList,
      };
      return newState;
    }
  }
};

export const TodoList = () => {
  const initialTodoListState: TodoState = {
    todoList: new Map(),
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

  const onClickClear = () => {
    todoListDispatch({ type: "clear" });
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
          className="btn btn-square btn-ghost ml-auto whitespace-nowrap px-6"
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
        <li className="p-4 pb-2 flex items-center justify-between">
          <p className="text-xs opacity-60">Todo List</p>
          <div className="tooltip" data-tip="Clear finished todos">
            <button
              className="btn btn-accent"
              type="button"
              onClick={onClickClear}
            >
              Clear
            </button>
          </div>
        </li>
        {Array.from(todoListState.todoList.values()).map(listToElements)}
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
