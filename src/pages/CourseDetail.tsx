import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import { getChapterBycourseId,getCourseById,getEnrolledCourses,deleteChapter, getWatchedChapter} from "../services/courseService";
import { Card, Typography, Table, message,Spin,Row,Col ,Button} from "antd";
import type { Course,Chapter } from "../types/course.types";
import AddChapterModal from "../components/AddChapterModal";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { EyeOutlined, EditOutlined, DeleteOutlined, CheckOutlined,MessageOutlined} from "@ant-design/icons";
import { Tooltip,Popconfirm } from "antd";
import VideoPlayerModal from "../components/VideoPlayerModal";
import ChatModal from "../components/ChatModal";




const { Title, Paragraph } = Typography;

const CourseDetail=()=>{

    const{courseId}=useParams<{courseId:string}>();
     const [course, setCourse] = useState<Course | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);
      const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const[isModalOpen,setIsModalOpen]=useState(false);
  const [editingChapter, setEditingChapter] = useState<Chapter | null>(null);
  const[isTeacher,setIsTeacher]=useState(false);
  const[isEnrolled,setIsEnrolled]=useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
const [selectedVideoUrl, setSelectedVideoUrl] = useState<string>("");
const [selectedChapterId, setSelectedChapterId] = useState<string>("");
const [watchedChapters, setWatchedChapters] = useState<string[]>([]);
const [chapterActionLoading, setChapterActionLoading] = useState(false);
const [isChatModalOpen, setIsChatModalOpen] = useState(false);

const userId = useSelector((state: RootState) => state.auth.id);
const auth = useSelector((state: RootState) => state.auth);


useEffect(()=>{
        const fetchData = async () => {

          if (!courseId) return;

try{
    const courseData =await getCourseById (courseId);

    const chapterData=await getChapterBycourseId(courseId);

    setCourse(courseData);
    setChapters(chapterData);
    if(userId&&courseData.created_by===userId){
        setIsTeacher(true)
    }
    if(userId){
        const enrolledCourses=await getEnrolledCourses(userId);
        const isEnrolled=enrolledCourses.some((course)=>course.id===courseId)
        setIsEnrolled(isEnrolled);

        const watched =await getWatchedChapter(userId);
        setWatchedChapters(watched);
    }

}catch(error){
    console.error("Failed to fetch",error);
    message.error("Failed to load course");
    
}
setLoading(false);
};
fetchData();},[courseId,userId])

//handel delete
const handelDelete=async(chapterId:string)=>{
  setChapterActionLoading(true);
  try{
    await deleteChapter(chapterId);
    message.success("chapter Deleted")
    //Refresh list
    if(courseId){
      const updatedChapter=await getChapterBycourseId(courseId);
      setChapters(updatedChapter);
    }
  }catch{
    message.error("failed to delete")

  }finally{
    setChapterActionLoading(false);
  }
};

  //Modal
    const openModal=(courseId:string,chapter?:Chapter)=>{
      setSelectedCourseId(courseId);
      setEditingChapter(chapter ?? null);
      setIsModalOpen(true);
  
    };
    const closeModal=()=>{
      setIsModalOpen(false);
      setSelectedCourseId(null);
      setEditingChapter(null);
    };

   if (loading) return <Spin tip="Loading..." />;

  if (!course) return <div>Course not found</div>;

    return(
        <div style={{margin:20}}>
        
     
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
                
                <Button hidden={!isTeacher} type="primary" onClick={()=>openModal(course.id)}  loading={chapterActionLoading}
>Add Chapter</Button>

                 {(isTeacher||isEnrolled)?(

                  <>
                  <Button
  icon={<MessageOutlined />}
  style={{ marginLeft: 12 }}
  onClick={() => setIsChatModalOpen(true)}
>
  Chat
</Button>


                <Table
                dataSource={chapters}
                rowKey="id"
                pagination={false}
                columns={[
                {
                    title:"Title",
                    dataIndex:"title",
                },
            {
                title:"Video",
                              dataIndex: "video_url",
              render: (_:unknown,chapter:Chapter) => (

                               <Tooltip title={ "Watch Video"}>

                <Button icon={<EyeOutlined />} type="link"onClick={() => {
          setSelectedVideoUrl(chapter.video_url);
          setSelectedChapterId(chapter.id!);
          setIsVideoModalOpen(true);
        }}
     >
</Button></Tooltip>
           )
             },

               
    { 
      hidden:!isTeacher,
        title:"Edit",
        render:(_:unknown,chapter:Chapter)=>(
        <Tooltip title="Edit">
          <Button  icon={ chapterActionLoading?<Spin size="small"/>:<EditOutlined />}onClick={()=>openModal(course.id,chapter)} />
        </Tooltip>
        ),
        },
       {
         hidden:!isTeacher,
        title:"Delete",
        render:(_:unknown,chapter:Chapter)=>(
      <Popconfirm
      title="Are U sure you want delete this chapter?"
      onConfirm={()=>handelDelete(chapter.id!)}
      okText="Yes"
      cancelText="No">
        <Tooltip title="Delete">
          <Button danger icon={chapterActionLoading?<Spin size="small"/>:<DeleteOutlined />} />
        </Tooltip>
        </Popconfirm>
        ),
        },
      ]}
          />
          </>
          ):(<></>)}
          
     <AddChapterModal open={isModalOpen} onClose={closeModal} courseId={selectedCourseId} editingChapter={editingChapter} onAddSuccess={async()=>{if(courseId){
      const updatedChapters = await getChapterBycourseId(courseId!);
            setChapters(updatedChapters);
     }

    }}/>
     <VideoPlayerModal open={isVideoModalOpen} videoUrl={selectedVideoUrl} onClose={()=>setIsVideoModalOpen(false)}  chapterId={selectedChapterId}
        onWatched={(chapterId) => {
    setWatchedChapters((prev) => [...prev, chapterId]);
  }}
/>
<ChatModal
  open={isChatModalOpen}
  onClose={() => setIsChatModalOpen(false)}
  senderId={userId!}
  senderName={auth.email || "You"}

    courseId={course.id}

/>

  </div>
 </div>
    );
}
export default CourseDetail;