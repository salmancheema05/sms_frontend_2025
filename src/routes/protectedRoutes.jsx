import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const AdminISAuthenticated = () => {
  const { token } = useSelector((state) => state.persisted?.user_auth || {});

  // If no token, send to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If token exists, show the requested route
  return <Outlet />;
};
export const AdminISNotAuthenticated = () => {
  const { token } = useSelector((state) => state.persisted?.user_auth || {});

  // If no token, send to login
  if (token) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};
