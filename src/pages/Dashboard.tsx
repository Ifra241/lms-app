import { Layout,Menu} from "antd";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import "../styles/Dashbord.css"

const{Content,Sider}=Layout;

const Dashboard=()=>{
  const navigate=useNavigate();
  const location=useLocation();
  

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