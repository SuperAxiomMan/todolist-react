import React, { useContext, useEffect, useState } from "react";
import { Redirect, Router } from "@reach/router";
import TodoList from "./components/Todolist";
import Register from "./components/Register";
import Login from "./components/Login";
import { storeContext } from "./Store";
import Error from "./components/Errors";

function App() {
  const { state, dispatch } = useContext(storeContext);
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    state.jwt && setLoggedIn(true);
  }, [state]);
  return (
    <div className="">
      <Error />
      <Router>
        <Login path="/" />
        <Register path="/register" />
        {loggedIn ? (
          <TodoList path="/todos" />
        ) : (
          <Redirect from="*" to="/" noThrow />
        )}
      </Router>
    </div>
  );
}

export default App;
