import { Modal ,Form,Input, Upload, Button, message} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import type { UploadChangeParam, UploadFile } from "antd/es/upload/interface";
import { addChapter, uploadVedio } from "../services/courseService";


interface ModalProps{
    open:boolean;
 onClose: () => void;
  courseId: string | null;
 

}

const AddChapterModal=( {open,onClose,courseId }:ModalProps)=>{
    const[video,setVideo]=useState<File|null>(null);
    const[loading,setLoading]=useState(false);
const [form]=Form.useForm();

const handleVedioChange=(info: UploadChangeParam<UploadFile>)=>{
      const latestFile = info.fileList[info.fileList.length - 1]?.originFileObj;

    console.log("Video file:", latestFile);

    if(latestFile)setVideo(latestFile as File)
};
const handleSubmit= async(values:{title:string})=>{
    if(!video){
        message.error("Please Upload a Vedio file");
        return;
    }
     if (!courseId) {
    message.error("Course ID is missing");
    return;
  }
    setLoading(true);
    try{
        const videoUrl = await uploadVedio(video); 
      await addChapter({title: values.title,
        video_url: videoUrl,
          course_id: courseId,
    });
       
   message.success("Chapter added!");
    form.resetFields();
    setVideo(null);
    onClose();
  } catch {
    message.error("Failed to add chapter");
  }
  setLoading(false);

    };



    return(
        <Modal
        open={open}
        onCancel={onClose}
        title="Add new Chapter"
        onOk={()=>form.submit()}
              confirmLoading={loading}

        okText="Add chapter">
            <Form layout="vertical" form={form} onFinish={handleSubmit}>
                <Form.Item
                label="Chapter Title"
                name="title" rules={[{required:true, message:"Please Enter a title"}]}>
                    <Input placeholder="Enter a chapter title"/>

                </Form.Item>

                <Form.Item
                label="Upload Vedio">
                    <Upload beforeUpload={()=>false}onChange={handleVedioChange}  accept="video/*"
           showUploadList={false}>
                        <Button icon={<UploadOutlined/>}>Upload vedio</Button>
                    </Upload>

                </Form.Item>

            </Form>
        </Modal>



    );
};
export default AddChapterModal;