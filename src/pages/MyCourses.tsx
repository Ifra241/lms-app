import { useEffect, useState } from "react";
import { Col, Row, Spin, message,Typography, Empty } from "antd";
import { useUser } from "@supabase/auth-helpers-react";
import { getCoursesByTeacher } from "../Services/courseService";
import type { Course} from "../Types/course.types";
import "../styles/AllCourses.css"
import { getProfile } from "../Services/adminService";
import CourseCard from "../Components/CourseCard";
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

  if(loading)return <div className="Loading">
<Spin tip="Loading Courses..."/></div>

 


  return(
      <div className="Container">
                    <Title className="Course_title"level={3}>My Courses  </Title>

         {isBlocked?( <Empty className="Empty_Box"   description="You are Blocked!"/>
         ):
         courses.length===0?(<Empty  className="Empty_Box"description="No course.Create a course to see My Courses"/>
                


               ):(
                <Row gutter={[16, 16]}>
  {courses.map((course) => (
    <Col key={course.id} xs={24} sm={12} md={8} lg={6}>

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