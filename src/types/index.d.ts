import { Dispatch } from "react";

interface State {
  todos: Todo[];
  tags: Tag[];
}
interface Todo {
  id: any;
  title: string;
  tag: { name: string };
}

interface Tag {
  id: any;
  name: string;
}

type Action =
  | SetTodos
  | SetTags
  | FetchTodos
  | AddTodo
  | DeleteTodo
  | FetchTags;

type Context = { state: State; dispatch: Dispatch<Action> };

interface SetTodos {
  type: "SET_TODOS";
  payload: Todo[];
}
interface SetTags {
  type: "SET_TAGS";
  payload: Tag[];
}
interface FetchTodos {
  type: "FETCHTODOS";
  payload: any;
}
interface AddTodo {
  type: "ADDTODO";
  payload: {};
}
interface DeleteTodo {
  type: "DELETETODO";
  payload: any;
}
interface FetchTags {
  type: "FETCHTAGS";
  payload: any;
}
