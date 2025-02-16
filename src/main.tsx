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
