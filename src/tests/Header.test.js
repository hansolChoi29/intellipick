import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Header from "../components/Header";
test("renders home link", () => {
    render(_jsx(BrowserRouter, { children: _jsx(Header, { isAuthenticated: false, signOut: () => { } }) }));
    const linkElement = screen.getByText(/홈/i);
    expect(linkElement).toBeInTheDocument();
});
test("renders logout button when authenticated", () => {
    render(_jsx(BrowserRouter, { children: _jsx(Header, { isAuthenticated: true, signOut: () => { } }) }));
    const buttonElement = screen.getByText(/로그아웃/i);
    expect(buttonElement).toBeInTheDocument();
});
