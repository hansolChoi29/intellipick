//jsonplaceholder API와의 통신 예시 코드, 실제 서비스와 연결되지 않음
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
