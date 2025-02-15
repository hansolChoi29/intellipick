import { useQuery } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Todo } from "../types/user";

const fetchTodos = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  if (!response.ok) {
    throw new Error("Failed to fetch todos");
  }
  return response.json();
};

const fetchTodoById = async (id: number) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${id}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch todo");
  }
  return response.json();
};

function TodoList() {
  const {
    data: todos,
    isLoading: isLoadingTodos,
    error: errorTodos,
  } = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  const {
    data: todo,
    isLoading: isLoadingTodo,
    error: errorTodo,
  } = useQuery({
    queryKey: ["todo", 1],
    queryFn: () => fetchTodoById(1),
    enabled: !!todos,
  });

  if (isLoadingTodos || isLoadingTodo) return <div>Loading...</div>;

  if (errorTodos instanceof Error || errorTodo instanceof Error) {
    return <div>Error: {errorTodos?.message || errorTodo?.message}</div>;
  }

  return (
    <>
      <div>
        <h1>Todos List</h1>
        <ul>
          {todos?.map((todo) => (
            <li key={todo.id}>
              {todo.id}: {todo.title}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Single Todo (ID 1)</h2>
        <p>
          {todo?.id}: {todo?.title}
        </p>
      </div>

      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}
export default TodoList;
