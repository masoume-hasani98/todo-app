import { TodoType } from "../pages/list/type";

export const getTodos = (): TodoType[] => {
  try {
    return JSON.parse(localStorage.getItem("todos") || "[]");
  } catch {
    return [];
  }
};

export const setTodos = (todos: TodoType[]) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};
