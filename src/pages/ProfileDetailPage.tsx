import { useState,useEffect } from "react";
import { Avatar, Button, Form, Input, Spin, Typography, message ,Card} from "antd";
import { getCurrentUserProfile,getCurrentUser,updateProfile } from "../services/authService";
import  type { UserProfile } from "../types/auth";
import "../styles/Profile.css"



const { Title,Text } = Typography;


type ProfileFormValues = {
  full_name: string;
  profile_pic: string;
  bio?: string;
};
 const ProfileDetailPage=()=>{
    const[loading,setLoading]=useState(true);
      const [profile, setProfile] = useState<UserProfile | null>(null);
        const [email, setEmail] = useState("");


        const [form] = Form.useForm();

        


         useEffect(() => {
    const fetch = async () => {
      const { user, error } = await getCurrentUser();
      if (error || !user) {
        console.error("Auth error", error);
        return;
      }
      setEmail(user.email!);
      try {
        const profileData = await getCurrentUserProfile();
        setProfile(profileData);
        form.setFieldsValue(profileData); // prefill the form
      } catch (error) {
        console.error("Failed to fetch profile", error);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [form]);

  const onFinish=async(values:ProfileFormValues)=>{
     try {
      const updated = await updateProfile(values);
      setProfile(updated);
      message.success("Profile updated successfully!");
    } catch (error) {
      console.error("Update failed", error);
      message.error("Failed to update profile");
    }
  };

  if (loading) return <Spin size="large" />;


  return(
      <div className="Profile_Container">
              

      <Card className="Profile_Wrapper">
        
        <div style={{ textAlign: "center", marginBottom: 20 }}>
            <h2>My Profile</h2>
          <Avatar size={100} src={profile?.profile_pic} />
          <Title level={3}>{profile?.full_name}</Title>
          <Text type="secondary">{email}</Text>
          <br />
          <Text><strong>Role:</strong> {profile?.role}</Text>
        </div>

        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item label="Full Name" name="full_name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Email" name="email">
            <Input/>
          </Form.Item>

          
          <Form.Item>
            <Button type="primary" htmlType="submit">Update Profile</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
 export default ProfileDetailPage;



