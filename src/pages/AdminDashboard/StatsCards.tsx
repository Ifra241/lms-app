import { useEffect, useState } from "react"; 
import AdminStats from "../../Components/AdminStats";
import { getAdminStats, getAllUsers } from "../../Services/adminService";
import UserTabel from "../../Components/UserTable";
import { Card, Spin } from "antd";
import type { UserWithRole, StatsType } from "../../Types/admin";
import UserDetailDrawer from "./UserDetailDrawer";
import "../../styles/StatsCard.css";

const StatsCard = () => {
  const [stats, setStats] = useState<StatsType>({
    totalCourses: 0,
    totalTeachers: 0,
    totalStudents: 0,
  });
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
   const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);




  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const result = await getAdminStats();
        const userData = await getAllUsers();
        setStats({
          totalCourses: result.totalCourses ?? 0,
          totalTeachers: result.totalTeachers ?? 0,
          totalStudents: result.totalStudents ?? 0,
        });
        setUsers(userData);
      } catch {
        console.error("Failed to fetch stats data");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const handleUserClick = (user: UserWithRole) => {
    setSelectedUserId(user.id);
    setDrawerOpen(true);
  };

  if (loading)
    return (
      <div className="Loading">
        <Spin tip="Loading Courses..." />
      </div>
    );

  return (
    <div className="StatsContainer">
      <div>
        <AdminStats
          totalCourses={stats.totalCourses}
          totalTeachers={stats.totalTeachers}
          totalStudents={stats.totalStudents}
        />
      </div>

      <div className="CenterCard">
        <Card style={{width:"800px",marginLeft:"2px"}} title="All Users">
          <UserTabel users={users} onUserClick={handleUserClick} />
        </Card>
      </div>

       <UserDetailDrawer
        userId={selectedUserId}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </div>
  );
};

export default StatsCard;
