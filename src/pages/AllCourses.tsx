import { useEffect, useState } from "react";
import { Button, Card, Col, Row, Spin, message } from "antd";
import { useUser } from "@supabase/auth-helpers-react";
import { getAllCourses, enrollCourse, getEnrolledCourses } from "../services/courseService";
import type { Course } from "../types/course.types";
import "../styles/AllCourses.css"
import { useNavigate } from "react-router-dom";

const AllCourses = () => {
  const user = useUser();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const[enrolledCourseIds, setEnrolledCourseIds]=useState<string[]>([]);
    const navigate = useNavigate();


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
    console.log("User ID:", user.id);
    console.log("Course ID:", courseId);
    try {
      await enrollCourse(courseId,user.id);
      message.success("Successfully enrolled!");
    } catch {
      message.error("Failed to enroll");
    }
  };

  if (loading) return <Spin tip="Loading Courses..." />;


    return(
        <div className="Container">
            <h2>All courses</h2>
            <Row gutter={[16,16]}>
                {courses.map((course)=>(
                    <Col key={course.id}xs={24}sm={12}md={6}>
                        <Card
                         title={course.title}
                         className="Course-card"
              cover={
                <img
                  src={course.thumbnail_url}
                  alt="thumbnail"
                   className ="course-thumbnail"
                />
              }
              
              actions={[
                enrolledCourseIds.includes(course.id)?(
                  <Button type="primary"onClick={()=>navigate(`/course-detail/${course.id}`)}>
                    Continue.....
                  </Button>

                ):(
                
                 <Button type="link" onClick={() => handleEnroll(course.id)}>
                  Enroll
                </Button>)
              
               
              ]}>
         <p>{course.description}</p>

                        </Card>
                    </Col>
                ))}

            </Row>
        </div>



    );

};
export default AllCourses;
