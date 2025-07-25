import { useEffect,useState } from "react";
import {  message, Popconfirm, Spin, Table, Tag } from "antd";
import { getStudentSummary } from "../../services/adminService";
import type { ColumnsType } from "antd/es/table";
import { blockStudent } from "../../services/adminService";

type SummaryItem={
    email:string,
    full_name:string;
    enrolled_courses:string;
    is_blocked_as_student:boolean;

}

const StudentSummary=()=>{
    const[data,setData]=useState<SummaryItem[]>();
    const [loadingEmail, setLoadingEmail] = useState("");

    useEffect(()=>{
        const fetchData=async()=>{
            try{
                const data=await getStudentSummary();
                setData(data);
            }catch(error){
                console.error("Failed to fetch",error)
            }
        };
        fetchData();
    },[])

    //handleBlock
    const handleBlock=async(email:string,isBlocked:boolean)=>{
        
  
        try{
                setLoadingEmail(email);

        await blockStudent(email,isBlocked);

        setData((prevData)=>prevData?.map((item)=>
            item.email ===email ?{...item,is_blocked_as_student:isBlocked}:item
        
        
        )
    );
    message.success(isBlocked?"Student Blocked Successfuly!"
        :"Student unblock Successfuly"

    );
   
    }catch(error){
        console.error("Failed to block",error)
        throw error;
    }finally{
        setLoadingEmail("");
    }
}
    const columns:ColumnsType<SummaryItem>=[
        {
            title:"Name",
            dataIndex:"full_name",
        },
        {
            title:"Email",
            dataIndex:"email",
        },
        {
            title:"Enrolled Courses",
            dataIndex:"enrolled_courses",
        },
        {
            title:"Blocked",
            dataIndex:"is_blocked_as_student",
            render:(_,record)=>(
                <Popconfirm 
                 title={
    record.is_blocked_as_student
      ? "Are you sure you want to unblock this student?"
      : "Are you sure you want to block this student?"
                }
     onConfirm={()=>handleBlock(record.email,!record.is_blocked_as_student)}
                  okText="Ok"
                  cancelText="No">
                 <Tag
          color={record.is_blocked_as_student ? "red" : "green"}
          style={{ cursor: "pointer" }}
        >
                    {loadingEmail === record.email ? (

         <Spin size="small"/>
                     ) :record.is_blocked_as_student ?( "In Active" ):( "Active")}
        </Tag>
        </Popconfirm>
     
                
            )
        },

    ];
    return(
        <div className="Container">
            <h2>Student Summary</h2>
            <Table dataSource={data}columns={columns}pagination={false}/>
        </div>
    );
};
export default StudentSummary;