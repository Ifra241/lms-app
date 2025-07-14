import { Button, Layout,Menu} from "antd";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import "../styles/Dashbord.css"
import { logout } from "../Slice/authSlice";
import { useDispatch } from "react-redux";
import { LogoutOutlined} from "@ant-design/icons";

const{Content,Sider}=Layout;

const Dashboard=()=>{
  const navigate=useNavigate();
  const location=useLocation();
    const dispatch = useDispatch();

    const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };



  return(

     <Layout>
      <Sider theme="light" className="Lms-Sider">
        <div className="Sider-title">LMS</div>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname.split("/").pop() || "dashboard"]}
          onClick={(e) => {
            navigate(`/dashboard/${e.key === "dashboard" ? "" : e.key}`);
          }}
          items={[
            { key: "dashboard", label: "Dashboard" },
            {key:"enrolledcourses", label:"Study Courses"},
            { key: "create-course", label: "Create Course" },
            { key: "mycourse", label: "My Courses" },
            { key: "all-courses", label: "Explore Courses" },
          ]}
        />
         <Button danger icon={<LogoutOutlined />} onClick={handleLogout}>
              Logout
            </Button>
     
      </Sider>
      <Layout>
        <Content className="Lms-Content">
   <Outlet />
  </Content>
</Layout>

    </Layout>
  );
};
export default Dashboard;