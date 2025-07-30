import { useEffect,useState } from "react";
import { Progress, Table,Switch, message, Spin } from "antd";
import type { ColumnsType } from "antd/es/table";
import { blockCourse, getAllCoursesWithEnrollments } from "../../Services/adminService";


type CourseItem = {
  id: string;
  title: string;
  enrollment_percent: number;
  created_at: string;
  created_by:string;
  enrolled_students:number;
    expected_students: number;
      creator_email: string;
      is_blocked:boolean;
    };

   const AdminCourses=()=>{
    const[courses,setCourses]=useState<CourseItem[]>([]);
    const [loadingCourseId, setLoadingCourseId] = useState<string | null>(null);
    const[loading,setLoading]=useState<boolean>(false);

 useEffect(()=>{
        const fetchCourses=async()=>{
          try{
            setLoading(true);
            const data =await getAllCoursesWithEnrollments();
            setCourses(data);
          }catch(error){
            console.error("Failed to fetch",error)
          }finally{
            setLoading(false);
          }
        };
        fetchCourses();
      },[])
      const handleBlockCourse=async(courseId:string,isBlocked:boolean)=>{
        try{
          setLoadingCourseId(courseId);
          await blockCourse(courseId,!isBlocked)
              message.success(`Course ${!isBlocked ? "blocked" : "unblocked"} successfully`);
setCourses((prev)=>prev.map((item)=>item.id===courseId?{...item,is_blocked:!isBlocked}:item));
 }catch{
  message.error("Failed to update course status");
 }finally{
  setLoadingCourseId(null);
 }
      };
if(loading)return <div className="Loading">
<Spin tip="Loading Courses..."/></div>
     


//Tabel
      const columns: ColumnsType<CourseItem> = [

      {
        title:"Title",
        dataIndex:"title"
        
      },
      {
        title:"Teacher",
        dataIndex:"creator_email"
      },
      {
        title:"Enrollment Progress",
        dataIndex:"enrollment_percent",
          render: (value: number) => <Progress percent={value} />,
      },
      {
        title:"Created At",
        dataIndex:"created_at",
        render: (value: string) =>
          value
    ?new Date(value).toLocaleString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
          : "—",

        
      },
      {
        title:"Blocked",
        dataIndex:"is_blocked",
        render:(_,record)=>(
          <Switch
          checked={record.is_blocked}
          onChange={()=>handleBlockCourse(record.id,record.is_blocked)}
          loading={loadingCourseId===record.id}/>
        ),
        
      },
      
      ];
    return (
    <div className="Container" style={{ padding: 24 }}>
      <h2>All Courses</h2>
      <Table
        columns={columns}
        dataSource={courses}
        rowKey="id"
        pagination={false}
          loading={loading}
      />
    </div>
  );
};

export default AdminCourses;
  


      


