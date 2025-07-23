import { Popconfirm,Button } from "antd";
import { logout } from "../Slice/authSlice";
import { supabase } from "../supabase/supabaseClient";
import{LogoutOutlined} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
  

 export const LogOut=()=>{
    const dispatch=useDispatch();
    const navigate=useNavigate();



  const handleLogout=async()=>{
      await supabase.auth.signOut();
      dispatch(logout());
      navigate("/")

    };
    return(
        <Popconfirm
        title="Are U Sure You Want SignOut!"
        okText="Ok"
        cancelText="No"
        onConfirm={handleLogout}>
          <div style={{ padding: 16 }}>
        <Button icon={<LogoutOutlined/>}>LogOut</Button></div>
        </Popconfirm>
     
    );
     };

