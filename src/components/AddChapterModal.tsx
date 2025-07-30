import { Modal ,Form,Input, Upload, Button, message} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import type { UploadChangeParam, UploadFile } from "antd/es/upload/interface";
import { addChapter, uploadVedio ,updateChapter} from "../Services/courseService";
import type { Chapter } from "../Types/course.types";
import { capitalizeWords } from "../Utils/capitalizeWords";

interface ModalProps{
    open:boolean;
 onClose: () => void;
  courseId: string | null;
  editingChapter?:Chapter|null;
    onEditSuccess?: () => void;
    onAddSuccess?: () => void;

 

}
const AddChapterModal=( {open,onClose,courseId ,editingChapter,onEditSuccess,onAddSuccess}:ModalProps)=>{
    const[video,setVideo]=useState<File|null>(null);
    const[loading,setLoading]=useState(false);
const [form]=Form.useForm();

const handleVedioChange=(info: UploadChangeParam<UploadFile>)=>{
      const latestFile = info.fileList[info.fileList.length - 1]?.originFileObj;

    console.log("Video file:", latestFile);

    if(latestFile)setVideo(latestFile as File)
};
useEffect(()=>{
  if(editingChapter){
    form.setFieldsValue({title:editingChapter.title});
  }else{
    form.resetFields();
    setVideo(null);
  }
},[editingChapter,form])




const handleSubmit= async(values:{title:string})=>{
     if (!courseId) {
    message.error("Course ID is missing");
    return;
  }
    setLoading(true);
    values.title=capitalizeWords(values.title.trim());
  
    try{
      let videoUrl=editingChapter?.video_url||"";
      if(video){
         videoUrl = await uploadVedio(video);
       }
       //Editing Mode
       console.log("Updating chapter with ID:", editingChapter?.id);

if(editingChapter?.id){
  await updateChapter(editingChapter.id,{
    title:values.title,
    video_url:videoUrl
  });
  message.success("Chapter updated!");
        onEditSuccess?.();

}else{
   if (!video) {
          message.error("Please upload a video file");
          setLoading(false);
          return;
        }
       
      await addChapter({title: values.title,
        video_url: videoUrl,
          course_id: courseId,

    });
       
   message.success("Chapter added!");
   onAddSuccess?.();
   }
    form.resetFields();
    setVideo(null);
    onClose();
  } catch {
    message.error(editingChapter?"Failed to edit chapter":"Failed to add chapter");
  }
  setLoading(false);

    };



    return(
        <Modal
        open={open}
        onCancel={onClose}
        title={editingChapter?"Edit Chapter":"Add Chapter"}
        onOk={()=>form.submit()}
              confirmLoading={loading}

        okText={editingChapter?"Edit":"Add"}>
            <Form layout="vertical" form={form} onFinish={handleSubmit}>
                <Form.Item
                label="Chapter Title"
                name="title" rules={[{required:true, message:"Please Enter a title"}]}>
                    <Input placeholder="Enter a chapter title"/>

                </Form.Item>

                <Form.Item
                label="Upload Video">
                    <Upload beforeUpload={()=>false}onChange={handleVedioChange}  accept="video/*"
           showUploadList={false}>
                        <Button icon={<UploadOutlined/>}>Upload Video</Button>
                    </Upload>

                </Form.Item>

            </Form>
        </Modal>



    );
};
export default AddChapterModal;