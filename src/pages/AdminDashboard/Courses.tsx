import { useEffect,useState } from "react";
import { Progress, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { getAllCoursesWithEnrollments } from "../../services/adminService";


type CourseItem = {
  id: string;
  title: string;
  enrollment_percent: number;
  created_at: string;
  created_by:string;
  enrolled_students:number;
    expected_students: number;
      creator_email: string;


   
  };


const AdminCourses=()=>{
    const[courses,setCourses]=useState<CourseItem[]>([]);
 useEffect(()=>{
        const fetchCourses=async()=>{
          try{
            const data =await getAllCoursesWithEnrollments();
            setCourses(data);
          }catch(error){
            console.error("Failed to fetch",error)
          }
        };
        fetchCourses();
      },[])
     


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
      
      ];
     
  

    return (
    <div className="Container" style={{ padding: 24 }}>
      <h2>All Courses</h2>
      <Table
        columns={columns}
        dataSource={courses}
        rowKey="id"
        pagination={false}
      />
    </div>
  );
};

export default AdminCourses;
  


      


