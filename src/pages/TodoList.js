import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import styled from "styled-components";
import { useState } from "react";
import { fetchTodos, fetchTodoById } from "../api/jsonPlaceholderApi";
function TodoList() {
    const { data: todos, isLoading: isLoadingTodos, error: errorTodos, } = useQuery({
        queryKey: ["todos"],
        queryFn: fetchTodos,
    });
    const { data: todo, isLoading: isLoadingTodo, error: errorTodo, } = useQuery({
        queryKey: ["todo", 1],
        queryFn: () => fetchTodoById(1),
        enabled: !!todos,
    });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;
    if (isLoadingTodos || isLoadingTodo)
        return _jsx("div", { children: "Loading..." });
    if (errorTodos instanceof Error || errorTodo instanceof Error) {
        return _jsxs("div", { children: ["Error: ", errorTodos?.message || errorTodo?.message] });
    }
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentTodos = todos?.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil((todos?.length || 0) / itemsPerPage);
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx(Container, { children: _jsxs("div", { children: [_jsx(Title, { children: "Todos List" }), _jsx("ul", { children: currentTodos?.map((todo) => (_jsxs("li", { children: [todo.id, ": ", todo.title] }, todo.id))) })] }) }), _jsxs("div", { children: [_jsx("p", { children: "Single Todo" }), _jsxs("p", { children: [todo?.id, ": ", todo?.title] })] }), _jsx(ButtonSetting, { children: _jsxs(Pagination, { children: [_jsx(Button, { onClick: handlePreviousPage, disabled: currentPage === 1, children: "Previous" }), _jsxs("span", { children: ["Page ", currentPage, " of ", totalPages] }), _jsx(Button, { onClick: handleNextPage, disabled: currentPage === totalPages, children: "Next" })] }) }), _jsx(ReactQueryDevtools, { initialIsOpen: false })] }));
}
const Container = styled.div `
  display: flex;
  flex-direction: center;
  justify-content: center;
  margin-top: 50px;
`;
const Title = styled.p `
  font-size: 20px;
  display: flex;
  flex-direction: center;
  justify-content: center;
`;
const Pagination = styled.div `
  display: flex;
  justify-content: center;
  margin-top: 20px;
  background: none;
  border: none;
  button {
    margin: 0 10px;
  }
`;
const Button = styled.button `
  background: none;
  border: 2px solid #ccc;
  padding: 10px 10px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: #b3916a;
    border-color: b3916a;
  }

  &:focus {
    outline: none;
    border-color: #b3916a;
    box-shadow: 0 0 5px #b3916a;
  }

  &:active {
    background-color: #f0f0f0;
  }
`;
const ButtonSetting = styled.div `
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
`;
export default TodoList;
