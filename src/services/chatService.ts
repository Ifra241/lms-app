import { supabase } from "../supabase/supabaseClient";

export type MessageProp={
  currentUserId:string;
  message: string;
  courseId?: string;
}
//Send message
export const sendMessage=async({currentUserId,message,courseId,}:MessageProp)=>{
    const{data,error}=await supabase.from("messages").insert([
        {
          sender_id: currentUserId,
            message,
             course_id:courseId||null,

    },
]);
if(error){
    console.error("Failed to snd msg",error)
    throw error;
}return data

};
//fetch message
export const fetchMessages = async (courseId: string) => {
  const { data, error } = await supabase
    .from("messages")
    .select(`id,message,created_at,sender_id,sender:sender_id (  full_name)`)


    .eq("course_id", courseId)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Failed to fetch messages", error);
    throw error;
  }
  return data;
};
//Delete
export const deleteMessage=async(messageId:string)=>{
  const{data,error}=await supabase.from("messages").delete().eq("id",messageId);
  if(error)throw error;
  return data;
}


///
export type Messages = {
  id: string;
  content: string;
  sender_id: string;
  receiver_id?: string;
  course_id: string;
  created_at: string;
};
export const subscribeToMessages = (
  courseId: string,
  callback: (newMessage: Messages) => void
) => {
  const channel = supabase
    .channel("chat-room")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "messages",
      },
      (payload) => {
        const newMessage = payload.new as Messages;

        // Filter manually to ensure correct course
        if (newMessage.course_id === courseId) {
          callback(newMessage);
        }
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
};
