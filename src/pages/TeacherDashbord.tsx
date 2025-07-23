import { useState,useEffect } from "react";
import TeacherChart from "../components/TeacherChart";
import {getCourseStats} from "../services/courseService";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { Col, Row, Spin ,Statistic,Card} from "antd";
import { Link } from "react-router-dom";


type Stat={
    course:string;
    students:number;
};

const TeacherDashbord=()=>{
    const[stats,setStats]=useState<Stat[]>([]);
    const[loading,setLoading]=useState(true);
    const userId=useSelector((state:RootState)=>state.auth.id);
    const role=useSelector((state:RootState)=>state.auth.role);

    useEffect(()=>{
        console.log("userId:", userId);
  console.log("role:", role);

      const fetchStats=async()=>{
            if(!userId)return;
            try{
                const res= await getCourseStats(userId);
                      res.sort((a, b) => b.students - a.students);

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
      const totalStudents = stats.reduce((acc,item)=>acc+item.students,0);

    return(
        <>
                <div >

            <Row gutter={16} style={{ marginBottom: 30 }}>
  <Col span={6}>
  <Link to="/dashboard/mycourse">

    <Card style={{width:200}}>
      <Statistic 
        title="Total Courses"
        value={totalCourses}
        valueStyle={{ color: "#3f8600" }}
      />
      
    </Card>
    </Link>
    
  </Col>


  <Col span={6}>
    <Card style={{width:200,padding:5}}>
      <Statistic
        title="Total Students"
        value={totalStudents}
        valueStyle={{ color: "#1890ff" }}
      />
    </Card>
  </Col>
</Row>
     
<div>
       <TeacherChart data={stats}  />
       </div>
        </div>
        </>


    );
};
export default TeacherDashbord;