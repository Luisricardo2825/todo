import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

const initialState: Todo[] = [];

export enum TodoActions {
  ADD = "ADD",
  REMOVE = "REMOVE",
  UPDATE = "UPDATE",
  DONE = "DONE",
  DELETE = "DELETE",
  DELETEALL = "DELETEALL",
}
interface action {
  data: Todo;
  type: TodoActions;
}
function TodoReducer(state: Todo[] = initialState, action: action) {
  const { data, type }: action = action;

  switch (type) {
    case "ADD":
      return [...state, { ...data, id: uuidv4() }];
    case "UPDATE":
      let todo = state[state.findIndex((todo) => todo.id === action.data.id)]; // Seleciona o todo
      state = state.filter((todo) => todo.id !== data.id); // Remove o TO-DO do array
      todo = { ...state, ...data };

      state.push(todo); // Adiciona o todo alterado ao array
      return [...state, data];

    case "REMOVE":
      state[state.findIndex((todo) => todo.id === action.data.id)].deleted =
        true;
      return [...state];
    case "DONE":
      const current =
        state[state.findIndex((todo) => todo.id === action.data.id)];
      current.done = !current.done;
      return [...state];
    case "DELETE":
      return [...state.filter((todo) => todo.id !== data.id)];
    case "DELETEALL":
      return [];
    default:
      return [...state];
  }
}

export default TodoReducer;
