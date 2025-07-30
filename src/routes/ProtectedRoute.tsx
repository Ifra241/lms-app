import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import type { RootState } from "../Store/Store";

interface ProtectedRouteProps {
  children: ReactNode;
  requireAuth?: boolean;
  onlyPublic?: boolean;
}

const AccessRoute = ({ children, requireAuth, onlyPublic }: ProtectedRouteProps) => {
  const user = useSelector((state: RootState) => state.auth);
  const isAuthenticated = !!user?.id;

  if (onlyPublic && isAuthenticated) {
    if(user.role==="admin"){
      return<Navigate to="/admin" replace/>
    }else{
    return <Navigate to="/dashboard" replace />;
    }
  }

  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default AccessRoute;
