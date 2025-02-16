import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ErrorBoundary } from "@sentry/react";
import { createRoot } from "react-dom/client";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import useAuthStore from "./store/authStore.ts";
import Dashboard from "./pages/Dashboard.tsx";
import TodoList from "./pages/TodoList.tsx";
import Header from "./components/Header.tsx";
import SignIn from "./pages/SignIn.tsx";
import SignUp from "./pages/SignUp.tsx";
import Home from "./pages/Home.tsx";
import App from "./App.tsx";
import "./sentry";
const queryClient = new QueryClient();
const RootComponent = () => {
  const { isAuthenticated, signOut } = useAuthStore();
  return (
    <>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Header isAuthenticated={isAuthenticated} signOut={signOut} />
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/home" element={<Home />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/todolist"
                element={
                  <ProtectedRoute>
                    <TodoList />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </ErrorBoundary>
    </>
  );
};

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(<RootComponent />);
