import { Layout, Menu } from "antd";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { Outlet, useNavigate } from "react-router-dom";

const AdminDashboard=()=>{
    const navigate=useNavigate();


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



            </Sider>
            <Layout>

                        <Content className="Lms-Content">
                            <Outlet/>
                            </Content>

            </Layout>
            



        </Layout>
        
        
        
        
        
        </>


    );
}
export default AdminDashboard;