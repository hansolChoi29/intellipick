import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.tsx";
import SignIn from "./pages/SignIn.tsx";
import SignUp from "./pages/SignUp.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import { Dashboard } from "./pages/Dashboard.tsx";

createRoot(document.getElementById("root")!).render(
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/" element={<App />} /> */}
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
