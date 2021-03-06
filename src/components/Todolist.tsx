import { RouteComponentProps } from "@reach/router";
import React, { FC, useContext, useEffect } from "react";
import { storeContext } from "../Store";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";

const TodoList: FC<RouteComponentProps> = () => {
  const { state, dispatch } = useContext(storeContext);
  useEffect(() => {
    dispatch({ type: "FETCHTODOS", payload: {} });
  }, []);
  return (
    <div className="flex flex-col">
      {console.log(state)}
      <h2 className="mt-6 text-center text-4xl text-gray-800">Todo List</h2>
      <div className="flex justify-center mt-8">
        <div className="bg-white shadow-xl rounded-lg w-1/2 max-w-2xl">
          <TodoForm />
          <ul className="divide-y divide-gray-300">
            {state.todos.map((value, index) => (
              <TodoItem key={index} todo={value} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
