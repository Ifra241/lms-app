import { supabase } from "../supabase/supabaseClient";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/"); // ya "/login" — jahan redirect karna ho
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
