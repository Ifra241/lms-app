import {  Layout,Menu,} from "antd";
import { Outlet, useNavigate, useLocation, Link} from "react-router-dom";
import "../styles/Dashbord.css"
import ProfileHeader from "../components/ProfileHeader";
import { useState } from "react";
import ProfilePage from "../components/profile";
import { LogOut } from "../components/logout";

const{Content,Sider}=Layout;

const Dashboard=()=>{
  const navigate=useNavigate();
  const location=useLocation();
 const[showProfile,setShowProfile]=useState<boolean>(false);

  return(
       <>
  <Layout>

      <Sider theme="light" className="Lms-Sider">
        <div className="Sider-title">LMS</div>
        <div style={{height:"90%",marginBottom:"-10px"}}>
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
        <br></br>
        <div style={{ padding: "16px 16px 8px 16px" }}>
          <div
        style={{ padding: "16px", cursor: "pointer" }}
        onClick={() => setShowProfile(!showProfile)}
      >
      
    < ProfileHeader/>
    </div>
    <>
    {showProfile &&(
          <Link to="/profile-detail">

      <ProfilePage/>
      </Link>
    )}
    </>
    </div>
  </div>
  <LogOut/>
        </Sider>
       <Layout>
  <Layout>
        <Content className="Lms-Content">
   <Outlet />
  </Content>
</Layout>
        </Layout>


    </Layout>
    </>
  );
};
export default Dashboard;