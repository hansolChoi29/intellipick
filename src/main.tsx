import { createRoot } from "react-dom/client";
import "./styles/tailwind.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.tsx";
import SignIn from "./pages/SignIn.tsx";
import SignUp from "./pages/SignUp.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import { Dashboard } from "./pages/Dashboard.tsx";
import App from "./App.tsx";
import Header from "./components/Header.tsx";
import useAuthStore from "./store/authStore.ts";
//대체 머가 멋져 빡치넴 썅 
const RootComponent = () => {
  const { isAuthenticated, signOut } = useAuthStore();
  return (
    <>
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
        </Routes>
      </BrowserRouter>
    </>
  );
};

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(<RootComponent />);
