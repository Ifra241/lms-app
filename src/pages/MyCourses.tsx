import { useEffect, useState } from "react";
import { Col, Row, Spin, message,Typography } from "antd";
import { useUser } from "@supabase/auth-helpers-react";
import { getCoursesByTeacher } from "../services/courseService";
import type { Course} from "../types/course.types";
import "../styles/AllCourses.css"
import { getProfile } from "../services/adminService";
import CourseCard from "../components/CourseCard";
const{Title}=Typography


const MyCourses =()=>{
    const user = useUser();
    const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const[isBlocked,setIsBlocked]=useState<boolean>(false);

  
//Fetch course
  useEffect(()=>{
    const fetchCourses =async()=>{
        if(!user)return;
        try{
          const profile=await getProfile(user.id);
          if(profile?.is_blocked_as_teacher){
            setIsBlocked(true);
          }else{
            const data =await getCoursesByTeacher(user.id);
                        setCourses(data);
                        }
        }catch{
            message.error("Failed to Fetch");
        }
        setLoading(false);
        
    };
    fetchCourses();
  },[user]);

  if(loading)return<Spin tip="Loading Courses..."/>

 


  return(
      <div className="Container">
                    <Title className="Course_title"level={3}>My Courses  </Title>

         {isBlocked?(  <p style={{ color: "red", fontWeight: "bold", fontSize: "16px" }}>You are Blocked!</p>
         ):
         courses.length===0?(
                <p style={{ color: "red", fontWeight: "bold", fontSize: "16px" }}>No course</p>


               ):(
                <Row gutter={[16, 16]}>
  {courses.map((course) => (
    <Col key={course.id} md={6}>
      <CourseCard
        id={course.id}
        title={course.title}
        thumbnail_url={course.thumbnail_url}
        isEnrolled={true}
      />
    </Col>
  ))}
</Row>

    
               )}


    </div>
  );

}
export default MyCourses;