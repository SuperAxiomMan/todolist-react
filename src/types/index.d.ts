interface State {
  todos: Todo[];
}
interface Todo {
  id: any;
  title: string;
}

type Action = SetTodos | FetchTodos | AddTodos | DeleteTodo;

interface SetTodos {
  type: "SET_TODOS";
  payload: Todo[];
}
interface FetchTodos {
  type: "FETCHTODOS";
  payload: any;
}
interface AddTodos {
  type: "ADDTODOS";
  payload: {};
}
interface DeleteTodo {
  type: "DELETETODO";
  payload: any;
}
