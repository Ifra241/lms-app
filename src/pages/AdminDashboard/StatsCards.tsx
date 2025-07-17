import { useEffect,useState } from "react";
import AdminStats from "../../components/AdminStats";
import { getAdminStats, getAllUsers } from "../../services/adminService";
import UserTabel from "../../components/UserTable";
import Card from "antd/es/card/Card";


const StatsCard=()=>{
    const[stats,setStats]=useState({totalCourses: 0,totalTeachers: 0,totalStudents: 0,});
    const[users,setUsers]=useState([]);

    useEffect(()=>{
        const fetchStats=async()=>{
            const result=await getAdminStats();
            const userData=await getAllUsers();
            setStats(result);
            setUsers(userData);

        };
        fetchStats();
    },[])

    
    return(
        <>
        <div className="Container">
            <h2>StatsCard</h2>
            <AdminStats
             totalCourses={stats.totalCourses}
        totalTeachers={stats.totalTeachers}
        totalStudents={stats.totalStudents}
            />
        </div>

          <Card title="All Users">
        <UserTabel users={users} />
      </Card>
        
        
        </>


    );
};
export default StatsCard;