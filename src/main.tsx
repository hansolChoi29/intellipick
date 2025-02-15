import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.tsx";
import SignIn from "./pages/SignIn.tsx";
import SignUp from "./pages/SignUp.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import App from "./App.tsx";
import Header from "./components/Header.tsx";
import useAuthStore from "./store/authStore.ts";
import Dashboard from "./pages/Dashboard.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TodoList from "./pages/TodoList.tsx";
const queryClient = new QueryClient();
const RootComponent = () => {
  const { isAuthenticated, signOut } = useAuthStore();
  return (
    <>
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
    </>
  );
};

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(<RootComponent />);
