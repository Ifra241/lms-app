/*import { Layout, Menu } from "antd";
import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
import ProfileHeader from "../../components/ProfileHeader";
import { LogOut } from "../../components/logout";
import "../../styles/Dashbord.css";
import LmsHeader from "../../components/Header";

const { Content, Sider,Header } = Layout;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedKey = location.pathname.split("/")[2] || "stats";

  return (
    <>
    <Layout >
      <Header className="Lms-Header">
        <LmsHeader/>
      </Header>

    <Layout>
      <Sider className="Lms-Sider" theme="light" width={220}>
        <div className="Sider-title">Admin</div>
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={(e) => {
            navigate(`/admin/${e.key}`);
          }}
          items={[
            { key: "stats", label: "Dashboard" },
            { key: "teachers", label: "Teachers" },
            { key: "students", label: "Students" },
            { key: "courses", label: "Courses" },
          ]}
        />

        <div style={{ padding: "16px 16px 8px 16px" }}>
          <div
            style={{ padding: "16px", cursor: "pointer" }}
          >
             <Link to="/dashboard/profile-detail">

    < ProfileHeader/>
          </Link>

          </div>
        </div>

        <LogOut />
      </Sider>

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

export default AdminDashboard;*/
