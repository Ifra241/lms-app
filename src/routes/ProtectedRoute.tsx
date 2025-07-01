import { useEffect,useState } from "react";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import{ getCurrentUser } from "../services/authService";


interface ProtectedRouteProps{
    children:ReactNode;

}
const ProtectedRoute=({ children }:  ProtectedRouteProps)=>{
    const[loading,setLoading]=useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
            
      const { user} = await getCurrentUser();

      if (user) {
        setIsAuthenticated(true);
      }
      setLoading(false);
    };

    checkUser();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!isAuthenticated) return <Navigate to="/" replace />;

  return <>{children}</>;
};

export default ProtectedRoute;