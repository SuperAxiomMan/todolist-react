import React, { createContext, PropsWithChildren, useReducer } from "react";
import { useReducerAsync } from "use-reducer-async";

const initialStoreContext = {
  state: {
    todos: [],
  },
};

//=Reducer=>
const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_TODOS":
      //   console.log("SET_TODOS");
      //   console.log(action.payload);
      return { ...state, todos: action.payload };
    default:
      return state;
  }
};

const baseHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
};
const asyncActionHandler: any = {
  FETCHTODOS:
    ({ dispatch }: { dispatch: ({}: Action) => {} }) =>
    async (action: Action) => {
      //   console.log("FETCHTODOS");
      const fetchSettings = {
        method: "GET",
        headers: baseHeaders,
      };
      try {
        const response = await fetch(
          "http://localhost:8000/todos",
          fetchSettings
        );
        const todos = await response.json();
        dispatch({ type: "SET_TODOS", payload: todos });
      } catch (e) {
        console.log(e);
      }
    },
  ADDTODO:
    ({ dispatch }: { dispatch: ({}: Action) => {} }) =>
    async (action: Action) => {
      const fetchSettings = {
        method: "POST",
        headers: baseHeaders,
        body: JSON.stringify(action.payload.values),
      };
      try {
        const response = await fetch(
          "http://localhost:8000/todos",
          fetchSettings
        );
        if (!response.ok) {
          console.log("error");
        } else {
          const fetchSettings = {
            method: "GET",
            headers: baseHeaders,
          };
          const response = await fetch(
            "http://localhost:8000/todos",
            fetchSettings
          );
          const todos = await response.json();
          dispatch({ type: "SET_TODOS", payload: todos });
        }
      } catch (e) {
        console.log(e);
      }
    },

  DELETETODO:
    ({ dispatch }: { dispatch: ({}: Action) => {} }) =>
    async (action: Action) => {
      console.log(action.payload.id);
      const fetchSettings = {
        method: "DELETE",
        headers: baseHeaders,
      };
      try {
        const response = await fetch(
          `http://localhost:8000/todos/${action.payload.id}`,
          fetchSettings
        );
        if (!response.ok) {
          console.log("error");
        } else {
          const fetchSettings = {
            method: "GET",
            headers: baseHeaders,
          };
          const response = await fetch(
            "http://localhost:8000/todos",
            fetchSettings
          );
          const todos = await response.json();
          dispatch({ type: "SET_TODOS", payload: todos });
        }
      } catch (e) {
        console.log(e);
      }
    },
};
//=Context=>

const storeContext = createContext(initialStoreContext);
const { Provider } = storeContext;
const StateProvider = ({ children }: PropsWithChildren<any>) => {
  const [state, dispatch] = useReducerAsync(
    reducer,
    initialStoreContext.state,
    asyncActionHandler
  );
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { storeContext, StateProvider };
