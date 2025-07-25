import { useState,useEffect } from "react";
import TeacherChart from "../components/TeacherChart";
import {getCourseStats,getUniqueStudents} from "../services/courseService";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { Col, Row, Spin ,Statistic,Card} from "antd";
import { Link } from "react-router-dom";
import StudentSummaryModal from "../components/StudentSummaryModal";
import "../styles/TeacherDash.css"



type Stat={
    course:string;
    students:number;
};

const TeacherDashbord=()=>{
    const[stats,setStats]=useState<Stat[]>([]);
    const[loading,setLoading]=useState(true);
    const userId=useSelector((state:RootState)=>state.auth.id);
    const role=useSelector((state:RootState)=>state.auth.role);
    const [uniqueStudents, setUniqueStudents] = useState(0);

      const [open, setOpen] = useState(false);

    useEffect(()=>{
        console.log("userId:", userId);
  console.log("role:", role);

      const fetchStats=async()=>{
            if(!userId)return;
            try{
                const res= await getCourseStats(userId);
                      res.sort((a, b) => b.students - a.students);
                      const studentCount=await getUniqueStudents(userId);
                      setUniqueStudents(studentCount);

                setStats(res);
            }catch(error){
                console.error("Failed to fetch stats",error)
            }finally{
                setLoading(false);
            }
        };
        fetchStats();

    },[userId,role]);
      if (loading) return <Spin tip="Loading Chart..." />;

      //calculate total
      const totalCourses = stats.length;
      const totalenrollment = stats.reduce((acc, item) => acc + item.students, 0);


    return(
        <>
                <div className="T_Container">

            <Row gutter={16}  className=" Row-Container">
  <Col span={6}>
  <Link to="/dashboard/mycourse">

    <Card  className="Total_Card">
      <Statistic 
        title="Total Courses"
        value={totalCourses}
        valueStyle={{ color: "#006d86ff" }}
      />
      
    </Card>
    </Link>
    
  </Col>
          <Col span={6}>
    <Card className="Total_Card"
    onClick={() => setOpen(true)}>
      <Statistic
        title="Total Students"
        value={uniqueStudents}
        valueStyle={{ color: "#5d18ffff" }}
      />
    </Card>
  </Col>
        <Col span={6}>
    <Card className="Total_Card">
      <Statistic
        title="Total Enrollments"
        value={totalenrollment}
        valueStyle={{ color: "#1859ffff" }}
      />
    </Card>
  </Col>
</Row>
     
<div>
       <TeacherChart data={stats}  />
             <StudentSummaryModal open={open} onClose={() => setOpen(false)} />

       </div>
        </div>
        </>


    );
};
export default TeacherDashbord;