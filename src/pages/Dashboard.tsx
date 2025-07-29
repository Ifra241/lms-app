import {  Layout,Menu,} from "antd";
import { Outlet, useNavigate, useLocation, Link} from "react-router-dom";
import "../styles/Dashbord.css"
import ProfileHeader from "../components/ProfileHeader";
import { LogOut } from "../components/logout";
import LmsHeader from "../components/Header";

const { Header, Content, Sider } = Layout;

const Dashboard=()=>{
  const navigate=useNavigate();
  const location=useLocation();

  return(
       <>
        <Layout >
      {/* TOP HEADER */}
      <Header className="Lms-Header">
        <LmsHeader />
      </Header>

      
       
       
  
    <Layout>
    
  {/*  Side Bar  */}
      <Sider theme="light" className="Lms-Sider">
        <div className="Sider-title">LMS</div>
        <div >
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
                  {/* Profile Section */}

        <div style={{ padding: "16px 16px 8px 16px" }}>
          <div
        style={{ padding: "16px", cursor: "pointer" }}
      >
        
                

    </div>
    <>

    </>
    </div>
  </div>
 
  <div style={{position:"fixed", left:"10px", bottom:"10px", width:"170px"}}>
<div >
        <Link to="/dashboard/profile-detail">
    < ProfileHeader/> 
          </Link>
          <LogOut/>
        </div>
     </div>   

        </Sider>
              {/* Main Content Area */}




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