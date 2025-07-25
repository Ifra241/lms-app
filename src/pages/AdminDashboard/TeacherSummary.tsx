import { useEffect,useState } from "react";
import { blockTeacher, getTeacherSummary } from "../../services/adminService";
import {message, Select, Spin, Table } from "antd";
import type { ColumnsType } from "antd/es/table";

type SummaryItem={
    email:string;
    total_courses:number;
    total_enrollments:number;
    full_name:string;
    courses:string;
    is_blocked_as_teacher:boolean;
    teacher_id:string;
    id:string;
    

};
    
const TeacherSummary=()=>{
    const[data,setData]=useState<SummaryItem[]>([]);
    const [loadingTeacher, setLoadingTeacher] = useState<string | null>(null);
        const[loading,setLoading]=useState<boolean>(false);



    useEffect(()=>{
        const fetchData=async()=>{

            try{
              setLoading(true);
                const summary=await getTeacherSummary();
                setData(summary);
            }catch(error){
                console.error("Failed to fetch",error);
            }finally{
              setLoading(false);
            }
        };
        fetchData();
    },[]);

    const handleChange = async (email: string, isBlocked: boolean) => {
setLoadingTeacher(email);        
  try {
    await blockTeacher(email,isBlocked);
    


    setData((prevData) =>
      prevData?.map((item) =>
        item.email === email? { ...item, is_blocked_as_teacher: isBlocked } : item
      )
    );
    message.success(isBlocked?"Teacher Blocked!"
      :"Teacher Unblock"
    );
    
  } catch (error) {
    console.error("Failed to block teacher", error);
    throw error;
  }finally{
    setLoadingTeacher(null);
  }
};
if(loading)return<Spin size="large"></Spin>


    
    const columns:ColumnsType<SummaryItem>=[

        {
            title:"Teacher Name",
            dataIndex:"full_name",
            key:"full_name",
        },
        {
            title:"Email",
            dataIndex:"email",
            key:"email",
        },
        {
            title:"Courses",
            dataIndex:"courses",
            key:"courses",
            

        },
        {
            title:"Total Courses",
            dataIndex:"total_courses",
        },
        {
            title:"Enrollments",
            dataIndex:"total_enrollments",
            key:"total_enrollments",
        },
       {
  title: "Blocked",
  dataIndex: "is_blocked_as_teacher",
  key: "is_blocked_as_teacher",
  render: (isBlocked: boolean, record) => (
    <Select
         loading={loadingTeacher === record.email} 

      defaultValue={isBlocked ? "inactive" : "active"}


      onChange={(value) => handleChange(record.email, value === "inactive")}
      options={[
        { value: "active", label: "Active" },
        { value: "inactive", label: "In Active" },
      ]}
      style={{ width: 120 }}
    />
  ),
}
 
        
    ];


    return(
        <div className="Container">
            <h2>Teachers Summary</h2>
            <Table columns={columns}dataSource={data}pagination={false}rowKey="teacher_id"/>
        </div>

    );
};

export default TeacherSummary;

