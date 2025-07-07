import { useEffect, useState } from "react";
import { Button, Card, Col, Row, Spin, message } from "antd";
import { useUser } from "@supabase/auth-helpers-react";
import { getAllCourses, enrollCourse } from "../services/courseService";
import type { Course } from "../types/course.types";

const AllCourses = () => {
  const user = useUser();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getAllCourses();
        setCourses(data);
      } catch {
        message.error("Failed to fetch courses");
      }
      setLoading(false);
    };

    fetchCourses();
  }, []);

  const handleEnroll = async (courseId: string) => {
    if (!user) return;
    try {
      await enrollCourse(user.id, courseId);
      message.success("Successfully enrolled!");
    } catch {
      message.error("Failed to enroll");
    }
  };

  if (loading) return <Spin tip="Loading Courses..." />;


    return(
        <div>
            <h2>All courses</h2>
            <Row gutter={[16,16]}>
                {courses.map((course)=>(
                    <Col key={course.id}xs={24}sm={12}md={8}>
                        <Card
                         title={course.title}
              cover={
                <img
                  src={course.thumbnail_url}
                  alt="thumbnail"
                  style={{ height: 200, objectFit: "cover" }}
                />
              }
              actions={[
                 <Button type="link" onClick={() => handleEnroll(course.id)}>
                  Enroll
                </Button>
               
              ]}
                        >
                                          <p>{course.description}</p>


                        </Card>
                    </Col>
                ))}

            </Row>
        </div>



    );

};
export default AllCourses;
