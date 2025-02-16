import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ErrorBoundary } from "@sentry/react";
import { createRoot } from "react-dom/client";
import ProtectedRoute from "./components/ProtectedRoute";
import useAuthStore from "./store/authStore";
import Dashboard from "./pages/Dashboard";
import TodoList from "./pages/TodoList";
import Header from "./components/Header";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import App from "./App";
import * as Sentry from "@sentry/react";
Sentry.init({
    dsn: "https://a3bdd43c8fe679bd6fd97ccd942aeb31@o4508828373680128.ingest.us.sentry.io/4508828375449600", // 여기에 실제 DSN 값을 넣어야 합니다.
    integrations: [],
});
const queryClient = new QueryClient();
const RootComponent = () => {
    const { isAuthenticated, signOut } = useAuthStore();
    return (_jsx(_Fragment, { children: _jsx(ErrorBoundary, { children: _jsx(QueryClientProvider, { client: queryClient, children: _jsxs(BrowserRouter, { children: [_jsx(Header, { isAuthenticated: isAuthenticated, signOut: signOut }), _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(App, {}) }), _jsx(Route, { path: "/home", element: _jsx(Home, {}) }), _jsx(Route, { path: "/sign-in", element: _jsx(SignIn, {}) }), _jsx(Route, { path: "/sign-up", element: _jsx(SignUp, {}) }), _jsx(Route, { path: "/dashboard", element: _jsx(ProtectedRoute, { children: _jsx(Dashboard, {}) }) }), _jsx(Route, { path: "/todolist", element: _jsx(ProtectedRoute, { children: _jsx(TodoList, {}) }) })] })] }) }) }) }));
};
const root = createRoot(document.getElementById("root"));
root.render(_jsx(RootComponent, {}));
