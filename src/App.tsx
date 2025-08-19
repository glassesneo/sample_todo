import React, { useState } from "react";
import { Header } from "./Header.tsx";
import { TodoList } from "./TodoList.tsx";

export const App = () => {
  return (
    <div className="App">
      <Header />
      <TodoList />
    </div>
  );
};
