import { useState, useEffect } from "react";
import { getCurrentUserProfile } from "../services/authService";
import { Spin, Typography, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Text } = Typography;

const ProfileHeader = () => {
  const [name, setName] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const profile = await getCurrentUserProfile();
        if (profile) {
          setName(profile.full_name || "User");
          setAvatarUrl(profile.profile_pic || null);
        }
      } catch (error) {
        console.error("Failed to fetch user profile", error);
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  if (loading) return <Spin size="small" />;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <Avatar
        size={40}
        icon={!avatarUrl && <UserOutlined />}
        src={avatarUrl || undefined}
        alt="Profile"
      />
      <Text strong>{name}</Text>
    </div>
  );
};

export default ProfileHeader;
