import { Modal ,Form,Input, Upload, Button, message} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import type { UploadChangeParam, UploadFile } from "antd/es/upload/interface";


interface ModalProps{
    open:boolean;
 onClose: () => void;

}

const AddChapterModal=( {open,onClose}:ModalProps)=>{
    const[video,setVideo]=useState<File|null>(null);
    const[loading,setLoading]=useState(false);
const [form]=Form.useForm();

const handleVedioChange=(info: UploadChangeParam<UploadFile>)=>{
    const file=info.file?.originFileObj;
    if(file)setVideo(file as File)
};
const handleSubmit= async(values:{title:string})=>{
    if(!video){
        message.error("Please Upload a Vedio file");
        return;
    }
    setLoading(true);
    console.log(values.title);
    try{
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
                    <Upload beforeUpload={()=>false}onChange={handleVedioChange}>
                        <Button icon={<UploadOutlined/>}>Upload vedio</Button>
                    </Upload>

                </Form.Item>

            </Form>
        </Modal>



    );
};
export default AddChapterModal;