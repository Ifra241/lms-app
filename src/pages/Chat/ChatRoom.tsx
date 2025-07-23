import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { sendMessage, fetchMessages ,subscribeToMessages, type Messages, deleteMessage} from "../../services/chatService";
import { Input, Spin, Button } from "antd";
import "../../styles/ChatRoom.css";
import { getMessageGroupLabel } from "../../utils/getMessageGroupLabel";

type Props = {
  senderId: string;
  courseId: string;
  senderName: string;
};

type Message = {
  id: string;
  sender_id :string;
  message: string;
  created_at: string;
  sender: {
    full_name: string;
  };
};

const ChatRoom = ({ senderId, courseId}: Props) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);



const currentUser = useSelector((state: RootState) => state.auth);
const currentUserId = currentUser?.id??"";

  const loadMessages = async () => {
      setLoading(true);

       try {
      const data = await fetchMessages(courseId);
      setMessages(data);
    } catch (err) {
      console.error("Error loading messages!", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    try {
      await sendMessage({ currentUserId, courseId, message: input });
      setInput("");
    } catch (err) {
      console.error("Error sending message", err);
    }
  };
  useEffect(() => {
    loadMessages();
    const unsubscribe=subscribeToMessages(courseId,(newMessage:Messages)=>{
      setMessages((prevMessages)=>[...prevMessages,newMessage]);
    });
    return()=>{
      unsubscribe();
    };
  }, [currentUserId, senderId,courseId]);

useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  //DTAE Day
  const groupedMessages:{[key:string]:Message[]}={};
  
  messages.forEach((msg)=>{
    const label=getMessageGroupLabel(msg.created_at);
    if(!groupedMessages[label]){
      groupedMessages[label]=[];
    }
    groupedMessages[label].push(msg);
  });
  //Handle Delte
  const handleMessageClick = (id: string) => {
  setSelectedMessageId((prev) => (prev === id ? null : id)); // toggle
};
const handleDelete=async(messageId:string)=>{
  try{
    await deleteMessage(messageId);
        setMessages((prev) => prev.filter((m) => m.id !== messageId));


    }catch(error){
      console.error("Failed to delete msg",error)
    }
  }





    return (
  <div className="chat-container">
    {loading ? (
      <Spin />
    ) : (
      <div className="message-list">
       {Object.entries(groupedMessages).map(([label, group]) => (
  <div key={label}>
    <div style={{ textAlign: "center", margin: "10px 0", color: "#888" }}>
      {label}
    </div>
    {group.map((msg, index) => {
      const isCurrentUser = msg.sender_id === currentUserId;
      const nextMsg = group[index + 1];
      const isLastFromSender = !nextMsg || nextMsg.sender_id !== msg.sender_id;

      return (
        <div key={msg.id} onClick={()=>handleMessageClick(msg.id)}  className={`message ${isCurrentUser ? "right" : "left"}`}>
          <div className={`message-bubble ${isCurrentUser ? "sender" : "receiver"}`}>
            <div className="message-text">{msg.message}</div>
            {selectedMessageId===msg.id && isCurrentUser &&(
              <button onClick={(e)=>{e.stopPropagation(); handleDelete(msg.id)}} className="delete-button ">Delete</button>
            )}
            <div className="Time_container">
              {new Date(msg.created_at).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
          {isLastFromSender && (
            <div className="message-meta">
              <strong>
                {isCurrentUser?"You":msg.sender?.full_name || "Unknown"}</strong>
            </div>
          )}
        </div>
      );
    })}
  </div>
))}

   <div ref={bottomRef} />
      </div>
    )}

    <Input.Group compact>
      <div className="message-input">
        <Input
          style={{ width: "80%" }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onPressEnter={handleSend}
          placeholder="Type your message..."
        />
        <Button type="primary" onClick={handleSend}>
          Send
        </Button>
      </div>
    </Input.Group>
  </div>
);
};

export default ChatRoom;
