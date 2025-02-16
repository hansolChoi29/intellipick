// src/api/jsonPlaceholderApi.ts
export const fetchTodos = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  if (!response.ok) {
    throw new Error("네트워크 응답 실패");
  }
  return response.json();
};

export const fetchTodoById = async (id: number) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${id}`
  );
  if (!response.ok) {
    throw new Error("네트워크 응답 실패");
  }
  return response.json();
};
