import { useEffect, useState } from "react";
import { Drawer, Descriptions, Spin, Typography } from "antd";
import { getUserDetailsFromView } from "../../Services/adminService";
import type { UserDetailedProfile } from "../../Types/user";

const { Title } = Typography;

interface UserDetailDrawerProps {
  userId: string | null;
  open: boolean;
  onClose: () => void;
}

export default function UserDetailDrawer({ userId, open, onClose }: UserDetailDrawerProps) {
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetailedProfile | null>(null);

  useEffect(() => {
    if (userId) {
      fetchUserDetails(userId);
    }
  }, [userId]);

  const fetchUserDetails = async (id: string) => {
    try {
      setLoading(true);
      const data = await getUserDetailsFromView(id);
      setUserDetails(data);
    } catch (err) {
      console.error("Error loading user details:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer
      title="User Details"
      placement="right"
      onClose={onClose}
      open={open}
      width={500}
    >
      {loading ? (
        <Spin size="large" />
      ) : userDetails ? (
        <>
          <Title level={3}>{userDetails.full_name}</Title>
          <Descriptions column={1} bordered>
            <Descriptions.Item label="Email">{userDetails.email}</Descriptions.Item>
            <Descriptions.Item label="Created Courses">
              {userDetails.created_courses?.length > 0
                ? userDetails.created_courses.map(course => course.title).join(", ")
                : "None"}
            </Descriptions.Item>
            <Descriptions.Item label="Enrolled Courses">
              {userDetails.enrolled_courses?.length > 0
                ? userDetails.enrolled_courses.map(course => course.title).join(", ")
                : "None"}
            </Descriptions.Item>
            <Descriptions.Item label="Blocked as Teacher">
              {userDetails.is_blocked_as_teacher ? "Yes" : "No"}
            </Descriptions.Item>
            <Descriptions.Item label="Blocked as Student">
              {userDetails.is_blocked_as_student ? "Yes" : "No"}
            </Descriptions.Item>
          </Descriptions>
        </>
      ) : (
        <p>No data available</p>
      )}
    </Drawer>
  );
}
