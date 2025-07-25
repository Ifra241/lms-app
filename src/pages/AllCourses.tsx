import { useEffect, useState } from "react";
import {  Col, Row, Spin, message } from "antd";
import { useUser } from "@supabase/auth-helpers-react";
import { getAllCourses, enrollCourse, getEnrolledCourses } from "../services/courseService";
import type { Course } from "../types/course.types";
import "../styles/AllCourses.css"
import CourseCard from "../components/CourseCard";

const AllCourses = () => {
  const user = useUser();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const[enrolledCourseIds, setEnrolledCourseIds]=useState<string[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getAllCourses();
        
 setCourses(data);
        if(user){
          const enrolled=await getEnrolledCourses(user.id);
          const enrolledIds=enrolled.map((course)=>course.id);
                  setEnrolledCourseIds(enrolledIds);

        }
      } catch {
        message.error("Failed to fetch courses");
      }
      setLoading(false);
    };

    fetchCourses();
  }, [user]);

  const handleEnroll = async (courseId: string) => {
    if (!user) return;
    try {
      await enrollCourse(courseId,user.id);
      message.success("Successfully enrolled!");
      setEnrolledCourseIds((prev)=>[...prev,courseId]);
    } catch {
      message.error("Failed to enroll");
    }
  };

  if (loading) return <Spin tip="Loading Courses..." />;


    return(
        <div className="Container">
            <h2>All courses</h2>
            <Row gutter={[18,12]}>
  {courses.map((course) => (
    <Col key={course.id} xs={24} sm={12} md={6}>
      <CourseCard
        id={course.id}
        title={course.title}
         description={course.description}
        thumbnail_url={course.thumbnail_url}
        isEnrolled={enrolledCourseIds.includes(course.id)}
        onEnroll={handleEnroll}
        showButton
      />
    </Col>
  ))}
</Row>

            
            

            
        </div>



    );

};
export default AllCourses;
