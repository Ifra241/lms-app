import { Layout, Menu } from "antd";
import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../Store/Store";

import ProfileHeader from "../Components/ProfileHeader";
import { LogOut } from "../Components/Logout";
import LmsHeader from "../Components/Header";
import "../styles/Dashbord.css";

const { Header, Content, Sider } = Layout;

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userRole = useSelector((state:RootState) => state.auth.role);

  const isAdmin = userRole === "admin";

  // Get current route key
  const selectedKey =
    location.pathname.split("/")[2] || (isAdmin ? "stats" : "dashboard");

  // Conditional Menu Items
  const menuItems = isAdmin
    ? [
        { key: "stats", label: "Dashboard" },
        { key: "teachers", label: "Teachers" },
        { key: "students", label: "Students" },
        { key: "courses", label: "Courses" },
      ]
    : [
        { key: "dashboard", label: "Dashboard" },
        { key: "enrolledcourses", label: "Study Courses" },
        { key: "create-course", label: "Create Course" },
        { key: "mycourse", label: "My Courses" },
        { key: "all-courses", label: "Explore Courses" },
      ];

  const baseRoute = isAdmin ? "admin" : "dashboard";

  return (
    <Layout>
      {/* Header */}
      <Header className="Lms-Header">
        <LmsHeader />
      </Header>

      <Layout>
        {/* Sidebar */}
        <Sider theme="light" className="Lms-Sider" width={220}>
          <div className="Sider-title">{isAdmin ? "Admin" : "LMS"}</div>

          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            onClick={(e) => {
              navigate(`/${baseRoute}/${e.key === "dashboard" ? "" : e.key}`);
            }}
            items={menuItems}
          />

          {/*Footer */}
          <div className="Footer">
            <Link to="/dashboard/profile-detail">
              <ProfileHeader />
            </Link>
            <LogOut />
          </div>
        </Sider>

        {/* Main Content */}
        <Layout>
          <Content className="Lms-Content">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
