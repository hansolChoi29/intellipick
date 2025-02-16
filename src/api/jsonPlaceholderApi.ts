import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchTodos = async () => {
  const response = await api.get("/todos");
  if (!response.data) {
    throw new Error("Failed to fetch todos");
  }
  return response.data;
};

export const fetchTodoById = async (id: number) => {
  const response = await api.get(`/todos/${id}`);
  if (!response.data) {
    throw new Error("Failed to fetch todo");
  }
  return response.data;
};
