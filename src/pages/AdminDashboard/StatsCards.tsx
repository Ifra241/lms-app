import { useEffect,useState } from "react";
import AdminStats from "../../components/AdminStats";
import { getAdminStats, getAllUsers } from "../../services/adminService";
import UserTabel from "../../components/UserTable";
import Card from "antd/es/card/Card";
import { Spin } from "antd";



const StatsCard=()=>{
    const[stats,setStats]=useState({totalCourses: 0,totalTeachers: 0,totalStudents: 0,});
    const[users,setUsers]=useState([]);
    const[loading,setLoading]=useState<boolean>(false);

    useEffect(()=>{
        const fetchStats=async()=>{
            try{
                setLoading(true);
            const result=await getAdminStats();
            const userData=await getAllUsers();
            setStats(result);
            setUsers(userData);
            }catch{
                console.error("FAiled to Fetch Stats data")
            }finally{
                setLoading(false);
            }

        };
        fetchStats();
    },[])
    if (loading)return<Spin size="large"></Spin>

    
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