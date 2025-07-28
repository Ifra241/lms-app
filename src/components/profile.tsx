/*import type { UserProfile } from "../types/auth";
import { useState,useEffect } from "react";
import { getCurrentUserProfile,getCurrentUser } from "../services/authService";
import { Avatar, Card, Spin,Typography } from "antd";
const{Text,Title}=Typography;
import "../styles/Profile.css"



const ProfilePage=()=>{
    const[loading,setLoading]=useState<boolean>(true);
    const[profile,setProfile]=useState<UserProfile|null>(null);
    const[email,setEmail]=useState<string>("");


    useEffect(()=>{
        const fetch=async()=>{
            setLoading(true);
            const{user,error}=await getCurrentUser();
            if(error||!user){
                console.error("Auth error",error);
                return;
            }
            setEmail(user.email!);
            try{
                const profileData=await getCurrentUserProfile();
                setProfile(profileData);
            }catch(error){
                console.error("Failed to fetch Profile",error);
            }finally{

                setLoading(false);
            }
        };
        fetch();
    },[]);
    if(loading)return <Spin size="large"/>

    return(
        <div >

            <Card className="Profile_card">
                <div style={{textAlign:"center"}}>
                    <Avatar size={100} src={profile?.profile_pic}/>
                    <Title level={3}>{profile?.full_name}</Title>
                    <Text type="secondary">{email}</Text>

                     <br />
          <Text><strong>Role:</strong> {profile?.role}</Text>
          {profile?.bio && (
            <>
              <br />
            </>
          )}
       

                </div>
            </Card>
        </div>
    );
};
export default ProfilePage;*/