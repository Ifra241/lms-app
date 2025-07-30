import { useState,useEffect } from "react";
import { getEnrolledCourses } from "../Services/courseService";
import type { Course } from "../Types/course.types";
import {Row, Col, Spin, Typography, Empty} from "antd";
import { useUser } from "@supabase/auth-helpers-react";
import { getProfile } from "../Services/adminService";
import CourseCard from "../Components/CourseCard";


const{Title}=Typography



const DashboardHome=()=>{
    const user=useUser();
      const userId = user?.id;


    const[courses,setCourses]=useState<Course[]>([]);
    const[loading,setLoading]=useState(true);
    const[isBlocked,setIsBlocked]=useState<boolean>(false);


    useEffect(()=>{
        if(!userId)return;
        const fetchCourses=async()=>{
            
            try{
                const profile=await getProfile(userId);
                if(profile?.is_blocked_as_student){
                    setIsBlocked(true);
                    return;
                }
                const enrolled =await getEnrolledCourses(userId);
                
                setCourses(enrolled);
            }catch(error){
                console.error("Failed to Fetch",error)
            }finally{
                setLoading(false);
            }
        };
        fetchCourses();
    },[userId]);

 if(loading)return <div className="Loading">
<Spin tip="Loading Courses..."/></div>

   


    return(
        <div className="Container">
            <Title className="Course_title"level={3}> Enrolled Courses  </Title>
             {isBlocked?(
                <Empty  className="Empty_Box" description="You are Blocked!"/>
              
            ):courses.length ===0?(
                <Empty className="Empty_Box" description="You are not Enrolled in any course"/> 
                
            ):
            (
           <Row gutter={[16, 16]}>
  {courses.map((course) => (
    <Col key={course.id} xs={24} sm={12} md={8} lg={6}>
      <CourseCard
        id={course.id}
        title={course.title}
        thumbnail_url={course.thumbnail_url}
        description={course.description}
        isEnrolled={true}
      />
    </Col>
  ))}
</Row>

                       
               
            )}
        </div>

    );
};
export default DashboardHome;