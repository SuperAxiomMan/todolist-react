import React, { createContext, PropsWithChildren, useReducer } from "react";
import { useReducerAsync } from "use-reducer-async";
import { Action, Context, State } from "./types";
import { navigate } from "@reach/router";

const initialStoreContext: Context = {
  state: {
    todos: [],
    tags: [],
  },
  dispatch: (_a: any) => {},
};

//=Reducer=>
const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_TODOS":
      return { ...state, todos: action.payload };
    case "SET_TAGS":
      return { ...state, tags: action.payload };
    case "SET_JWT":
      console.log("SET_JWT");
      navigate("/todos");
      return { ...state, jwt: action.payload };

    default:
      return state;
  }
};

const baseHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
};
const asyncActionHandler: any = {
  FETCHTAGS:
    ({ dispatch }: { dispatch: ({}: Action) => {} }) =>
    async (action: Action) => {
      console.log("FETCHTAGS");
      const fetchSettings = {
        method: "GET",
        headers: baseHeaders,
      };
      try {
        const response = await fetch(
          "http://localhost:8000/tags",
          fetchSettings
        );
        const tags = await response.json();
        dispatch({ type: "SET_TAGS", payload: tags });
      } catch (e) {
        console.log(e);
      }
    },
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
          "http://localhost:8000/todos?_expand=tag",
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
            "http://localhost:8000/todos?_expand=tag",
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
            "http://localhost:8000/todos?_expand=tag",
            fetchSettings
          );
          const todos = await response.json();
          dispatch({ type: "SET_TODOS", payload: todos });
        }
      } catch (e) {
        console.log(e);
      }
    },
  REGISTER:
    ({ dispatch }: { dispatch: ({}: Action) => {} }) =>
    async (action: Action) => {
      console.log("REGISTER");
      const fetchSettings = {
        method: "POST",
        headers: baseHeaders,
        body: JSON.stringify(action.payload),
      };
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URI}/signup`,
          fetchSettings
        );
        if (!response.ok) {
          console.log("ERROR");
        } else {
          // console.log(await response.json());
          navigate("/");
        }
      } catch (e) {
        console.log(e);
      }
    },
  LOGIN:
    ({ dispatch }: { dispatch: ({}: Action) => {} }) =>
    async (action: Action) => {
      console.log("LOGIN");
      const fetchSettings = {
        method: "POST",
        headers: baseHeaders,
        body: JSON.stringify(action.payload),
      };
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URI}/signin`,
          fetchSettings
        );
        if (!response.ok) {
          console.log("ERROR");
        } else {
          dispatch({
            type: "SET_JWT",
            payload: (await response.json()).accessToken,
          });
          // navigate("/");
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
