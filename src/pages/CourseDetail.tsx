import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import { getChapterBycourseId,getCourseById } from "../services/courseService";
import { Card, Typography, Table, message,Spin,Row,Col } from "antd";
import type { Course,Chapter } from "../types/course.types";


const { Title, Paragraph } = Typography;

const CourseDetail=()=>{
    const{courseId}=useParams<{courseId:string}>();
     const [course, setCourse] = useState<Course | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
        const fetchData = async () => {
            console.log("UseEffect started");

          if (!courseId) return;
          console.warn("No CourseId from Url");
try{
    console.log("Fetching courseId",courseId)
    const courseData =await getCourseById (courseId);
        console.log("Coursedata:", courseData);

    const chapterData=await getChapterBycourseId(courseId);
        console.log("chapterdata:", chapterData);

    setCourse(courseData);
    setChapters(chapterData);

}catch(error){
    console.error("Failed to fetch",error);
    message.error("Failed to load course");
    
}finally{
    console.log("Loadin set false");
}
setLoading(false);
};
fetchData();

  },[courseId])
   if (loading) return <Spin tip="Loading..." />;

  if (!course) return <div>Course not found</div>;





    return(
        <>
            <Card style={{marginBottom:24}}>
                <Row gutter={[24,24]}>
                    <Col xs={24} md={8}>
                    <img
                    src={course.thumbnail_url}
                 alt="Course thumbnail"
               style={{ width: "100%", borderRadius: 8, maxHeight: 200, objectFit: "cover" }}
    />

                    </Col>
                        <Col xs={24} md={16}>
                         <Title level={2}>{course.title}</Title>
      <Paragraph>{course.description}</Paragraph>
      </Col>
   </Row>
            </Card>
           
            <div>
                <Title level={4}>Chapters</Title>

                <Table
                dataSource={chapters}
                rowKey="id"
                pagination={false}
                columns={[
                {
                    title:"ID",
                  dataIndex: "id",

                },
                {
                    title:"Title",
                    dataIndex:"title",
                },
            {
                title:"Vedio",
                              dataIndex: "video_url",
              render: (url:string) => (
                    <a href={url} target="_blank" rel="noopener noreferrer">
                              {url}
</a>

            ),
             },

              ]}
          />
           </div>
          </>
    );
}
export default CourseDetail;