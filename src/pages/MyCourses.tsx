import { useEffect, useState } from "react";
import { Button, Card, Col, Row, Spin, message } from "antd";
import { useUser } from "@supabase/auth-helpers-react";
import { getCoursesByTeacher } from "../services/courseService";
import type { Course ,Chapter} from "../types/course.types";
import AddChapterModal from "../components/AddChapterModal";
import { getChapterBycourseId } from "../services/courseService";
import { Link } from "react-router-dom";
const MyCourses =()=>{
    const user = useUser();
    const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
    const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
const [chapters, setChapters] = useState<Record<string, Chapter[]>>({});

  const[isModalOpen,setIsModalOpen]=useState(false);
//Modal
  const openModal=(courseId:string)=>{
    setSelectedCourseId(courseId);
    setIsModalOpen(true);

  };
  const closeModal=()=>{
    setIsModalOpen(false);
    setSelectedCourseId(null);
  };
//Fetch course
  useEffect(()=>{
    const fetchCourses =async()=>{
        if(!user)return;
        try{
            const data =await getCoursesByTeacher(user.id);
            setCourses(data);
            //fetch chapter
            const chapterMap: Record<string, Chapter[]> = {};
        for (const course of data) {
          const courseChapters = await getChapterBycourseId(course.id);
          chapterMap[course.id] = courseChapters;
        }
        setChapters(chapterMap);
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

      <Link to={`/course-detail/${course.id}`}>
            <Card
            
              title=  {course.title}
              cover={<img src={course.thumbnail_url} alt="thumbnail" />} >
                <strong>Chapters:</strong>
              <ul>
                {(chapters[course.id] || []).map((ch) => (
                  <li key={ch.id}>{ch.title}</li>
                ))}
              </ul>
            </Card>
            </Link>
              <Button type="primary" onClick={()=>openModal(course.id)}>Add Chapter</Button>


             </Col>
              ))}
               </Row>

                     <AddChapterModal open={isModalOpen} onClose={closeModal} courseId={selectedCourseId} />

    </div>
  );

}
export default MyCourses;