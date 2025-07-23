import {  Modal } from "antd";
import ChatRoom from "../pages/Chat/ChatRoom";



type ChatModalProp={
    open:boolean,
      onClose: () => void;
       senderId:string,
    courseId:string,
    senderName:string,
};
const ChatModal=({open,onClose,senderId,courseId,senderName}:ChatModalProp)=>{
    


    return(
        <>
        <Modal
        open={open}
        onCancel={onClose}
        footer={null} title="Chat Room"
        width={600} >
            <ChatRoom
            senderId={senderId}
            courseId={courseId}
            senderName={senderName}

            
            />
            
               
        </Modal>
        
        
        
        </>
    );
};
export default ChatModal;