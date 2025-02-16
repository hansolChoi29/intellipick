import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Header from "../components/Header";

test("renders home link", () => {
  render(
    <BrowserRouter>
      <Header isAuthenticated={false} signOut={() => {}} />
    </BrowserRouter>
  );
  const linkElement = screen.getByText(/홈/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders logout button when authenticated", () => {
  render(
    <BrowserRouter>
      <Header isAuthenticated={true} signOut={() => {}} />
    </BrowserRouter>
  );
  const buttonElement = screen.getByText(/로그아웃/i);
  expect(buttonElement).toBeInTheDocument();
});
