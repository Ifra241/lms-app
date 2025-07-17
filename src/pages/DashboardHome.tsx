import { useState,useEffect } from "react";
import { getEnrolledCourses } from "../services/courseService";
import type { Course } from "../types/course.types";
import { Card, Row, Col, Spin, Typography, message } from "antd";
import { useUser } from "@supabase/auth-helpers-react";
import { Link } from "react-router-dom";


const{Title}=Typography



const DashboardHome=()=>{
    const user=useUser();
      const userId = user?.id;


    const[courses,setCourses]=useState<Course[]>([]);
    const[loading,setLoading]=useState(true);


    useEffect(()=>{
        if(!userId)return;
        const fetchCourses=async()=>{
            
            try{
                const enrolled =await getEnrolledCourses(userId);
                if(enrolled.length===0){
                    message.warning("You blocked");
                }
                setCourses(enrolled);
            }catch(error){
                console.error("Failed to Fetch",error)
            }finally{
                setLoading(false);
            }
        };
        fetchCourses();
    },[userId]);

    if(loading)return<Spin tip="Loadin enroll course.."/>;
   


    return(
        <div className="Container">
            <Title level={3}> Enrolled Courses  </Title>
             {courses.length===0?(
                <p>You are blocked!</p>
            ):(
           
                        <Row gutter={[16,16]}>

            {courses.map((course)=>(
                <Col xs={24}sm={12}md={8}lg={6}key={course.id}>
                   <Link to={`/course-detail/${course.id}`}>
                    <Card
                                                title={course.title}

                    cover={
                        <img  className="course-thumbnail"alt={course.title}src={course.thumbnail_url}/>
                    } >
                        <Card.Meta
                            description={course.description}
                            />
                        

                    </Card>
                    </Link>


                </Col>
            )

            )}
        



            </Row>
            )}
        </div>

    );
};
export default DashboardHome;