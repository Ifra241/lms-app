import { useState,useEffect } from "react";
import { Avatar, Button, Form, Input, Spin, Typography, message ,Card} from "antd";
import { getCurrentUserProfile,getCurrentUser,updateProfile, uploadProfilePic } from "../Services/authService";
import  type { UserProfile } from "../Types/auth";
import "../styles/Profile.css"



const { Title,Text } = Typography;


type ProfileFormValues = {
  full_name: string;
  profile_pic: string|File;
};
 const ProfileDetailPage=()=>{
    const[loading,setLoading]=useState(true);
      const [profile, setProfile] = useState<UserProfile | null>(null);
        const [email, setEmail] = useState("");
        const [selectedFile, setSelectedFile] = useState<File | null>(null);



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
               form.setFieldsValue({
  full_name: profileData.full_name,
  email: user.email
}); // prefill the form
      } catch (error) {
        console.error("Failed to fetch profile", error);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [form]);
  const onFinish = async (values: ProfileFormValues) => {
  try {
    let profilePicUrl = profile?.profile_pic;

    if (selectedFile) {
      const uploadedUrl = await uploadProfilePic(selectedFile);
      if (!uploadedUrl) {
        message.error("Failed to upload image");
        return;
      }
      profilePicUrl = uploadedUrl;
    }

    const updated = await updateProfile({
      full_name: values.full_name,
      profile_pic: profilePicUrl,
    });

    setProfile(updated);
    const refreshed = await getCurrentUserProfile();
setProfile(refreshed);

    message.success("Profile updated successfully!");
  } catch (error) {
    console.error("Update failed", error);
    message.error("Failed to update profile");
  }
};


  
if(loading)return <div className="Loading">
<Spin tip="Loading Courses..."/></div>


  return(
      <div className="Profile_Container">
              

      <Card className="Profile_Wrapper">
        
        <div className="Profile_title">
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

         

<Form.Item label="Profile Picture">
  <Input
    type="file"
    accept="image/*"
    onClick={(e) => e.stopPropagation()}
    onChange={(e) => {
      const file = e.target.files?.[0];
      if (file) {
        setSelectedFile(file); 
      }
    }}
  />
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



