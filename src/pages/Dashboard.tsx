import { Button } from "antd";
import { supabase } from "../supabase/supabaseClient";
import { useNavigate,Link } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/"); // ya "/login" — jahan redirect karna ho
  };

  return (
    <>
    <button onClick={handleLogout}>Logout</button>

    <Button type="primary"><Link to={'/create-course'}>CreateCourse</Link></Button>
    <Link to="/all-courses">Explore Courses</Link>

    </>


  );

}

export default LogoutButton;
