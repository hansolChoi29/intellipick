import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuthStore();
    if (!isAuthenticated) {
        return _jsx(Navigate, { to: "/sign-in" });
    }
    return _jsx(_Fragment, { children: children });
};
export default ProtectedRoute;
