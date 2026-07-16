import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth.js";

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate replace to="/login" />;
};
