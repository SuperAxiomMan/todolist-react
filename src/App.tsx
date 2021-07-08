import React, { useState } from "react";
import { Router } from "@reach/router";
import TodoList from "./components/Todolist";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  return (
    <div className="">
      <Router>
        <Login path="/" />
        <Register path="/register" />
        <TodoList path="/todos" />
      </Router>
    </div>
  );
}

export default App;
