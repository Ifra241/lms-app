import { useEffect,useState } from "react";
import AdminStats from "../../Components/AdminStats";
import { getAdminStats, getAllUsers } from "../../Services/adminService";
import UserTabel from "../../Components/UserTable";
import Card from "antd/es/card/Card";
import { Spin } from "antd";
import "../../styles/StatsCard.css";



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
if(loading)return <div className="Loading">
<Spin tip="Loading Courses..."/></div>

    
    return(
        <div className="StatsContainer">
            <div>
            <AdminStats
             totalCourses={stats.totalCourses}
        totalTeachers={stats.totalTeachers}
        totalStudents={stats.totalStudents}
            />
            </div>
        
          <div className="CenterCard">


          <Card title="All Users">
        <UserTabel users={users} />
      </Card>
      </div>
        
        
        </div>


    );
};
export default StatsCard;