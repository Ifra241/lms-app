import {Layout, Menu } from "antd";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import ProfileHeader from "../../components/ProfileHeader";
import ProfilePage from "../../components/profile";
import { LogOut } from "../../components/logout";

const AdminDashboard=()=>{
    const navigate=useNavigate();
  const[showProfile,setShowProfile]=useState<boolean>(false);

    return(
        <>
        <Layout>
            <Sider  className="Lms-Sider"theme="light" width={220}>
                <div  className="Sider-title">Admin</div>
                <Menu
                mode="inline"
                selectedKeys={[location.pathname.split("/").pop()||"stats"]}
                onClick={(e)=>{
                     navigate(`/admin/${e.key}`);
                    
                }}

                items={[
                    {key:"stats",label:"Dashboard"},
                    {key:"teachers",label:"Teachers"},
                    { key: "students", label: "Students" },
                    { key: "courses", label: "Courses" },
                ]}
 />

       <div style={{ padding: "16px 16px 8px 16px" }}>
          <div
        style={{ padding: "16px", cursor: "pointer" }}
        onClick={() => setShowProfile(!showProfile)}
      >
      
    < ProfileHeader/>
    </div>
    {showProfile &&(
      <ProfilePage/>
    )}
  </div>
        <LogOut/>
            </Sider>
            <Layout>
 <Content className="Lms-Content">
<Outlet/>
 </Content>
 </Layout>
</Layout>
  </>
 );
};
export default AdminDashboard;