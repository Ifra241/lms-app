import { useEffect, useState } from "react";
import { Card, Col, Row, Spin, message } from "antd";
import { useUser } from "@supabase/auth-helpers-react";
import { getCoursesByTeacher } from "../services/courseService";
import type { Course } from "../types/course.types";

const MyCourses =()=>{
    const user = useUser();
    const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const fetchCourses =async()=>{
        if(!user)return;
        try{
            const data =await getCoursesByTeacher(user.id);
            setCourses(data);
        }catch{
            message.error("Failed to Fetch");
        }
        setLoading(false);
    };
    fetchCourses();
  },[user]);
  if(loading)return<Spin tip="Loading Courses..."/>

  return(
    <div>
         <h2>My Courses</h2>
      <Row gutter={[16, 16]}>
        {courses.map((course) => (
          <Col key={course.id} xs={24} sm={12} md={8}>
            <Card
              title={course.title}
              cover={<img src={course.thumbnail_url} alt="thumbnail" />}>
            </Card>
             </Col>
              ))}
               </Row>
    </div>
  );

}
export default MyCourses;