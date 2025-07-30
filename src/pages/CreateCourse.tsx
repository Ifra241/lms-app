import { useEffect, useState } from "react";
import { Button,Input,Form,Upload, message, Card, Spin } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import type { UploadChangeParam } from 'antd/es/upload/interface';
import { uploadThumbnail,createCourse } from "../Services/courseService";
import type { CreateCourseFormValues } from "../Types/course.types";
import { useUser } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";
import "./../styles/CreateCourse.css";
import { getProfile } from "../Services/adminService";
import { capitalizeWords} from "../Utils/capitalizeWords";


const CreateCourse =()=>{
    const[thumbnail,setThumbnail]=useState<File|null>(null)
      const [loading, setLoading] = useState(false);
        const [form] = Form.useForm();
        const user = useUser();
        const navigate=useNavigate();
        const userId = user?.id;

        useEffect(() => {
  if (!userId) return;

  const checkBlocked = async () => {
    try {
      const profile = await getProfile(userId);
      if (profile?.is_blocked_as_teacher) {
        message.error("You are blocked!");
      }
    } catch (error) {
      console.error("Failed to check status", error);
    }
  };

  checkBlocked();
}, [userId]);

 const handleThumbnailChange=(info:UploadChangeParam )=>{

        const file = info.fileList?.[0]?.originFileObj;
         console.log("Upload Info:", info);
          console.log("File selected:", file);

        if(file){
        setThumbnail(file as File);
        }
    };
        const handleSubmit = async(values: CreateCourseFormValues)=>{

            if (!userId) {
  message.error("User not found");
  return;
}
  values.title = capitalizeWords(values.title.trim());
  values.description=capitalizeWords(values.description.trim());



            const profile = await getProfile(userId!);
  if (profile?.is_blocked_as_teacher) {
    return message.error("You are blocked from creating a course.");
  }

            if(!thumbnail){
                message.error("Please select a thumbnail image");
                return;


            }
            setLoading(true);
            try{
                const thumbnailUrl=await uploadThumbnail(thumbnail);

              const course = await createCourse(values,thumbnailUrl,user!.id);
                   console.log("Form submitted")
                message.success("Course created successfuly!");
                form .resetFields();
                setThumbnail(null);
                navigate(`/dashboard/course-detail/${course.id}`);

            }catch(err){
                 console.error("Course creation error:", err);
                message.error("Something went wrong");
            }
            setLoading(false);
        }
        if(loading)return <div className="Loading">
<Spin tip="Loading Courses..."/></div>

    


    return(
        <div className="Create-Container">
            <Card className="create-card">
            <h2 className="Create_title">Create New Course</h2>
                   <Form layout="vertical"
            onFinish={handleSubmit}>
                <Form.Item
                label="Course Title"
                name="title"
                rules={[{required:true,message:'Please Enter title'}]} >
                    <Input placeholder="Enter course title"/>
                </Form.Item>
<Form.Item
          label="Course Description"
          name="description"
          rules={[{ required: true, message: 'Please enter the description' }]}
        >
          <Input.TextArea rows={4} placeholder="Write a short description" />
        </Form.Item>

        <Form.Item label="Course Thumbnail">
            <Upload
            beforeUpload={()=>false}
            onChange={handleThumbnailChange}
            showUploadList={false}
             accept="image/*"
              maxCount={1}  >
                <Button icon={<UploadOutlined />}> Upload Thumbnail</Button>

            </Upload>
                      {thumbnail && <p className="mt-2">Selected: {thumbnail.name}</p>}

        </Form.Item>
         <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}   >
              Submit
          </Button>
        </Form.Item>
        

            </Form>
                

            </Card>
        </div>
    );
};
export default CreateCourse;