import { Card, Button } from "antd";
import { useNavigate } from "react-router-dom";
import "../styles/AllCourses.css"


interface CourseCardProps {
  id: string;
  title: string;
  thumbnail_url: string;
  description?: string;
  isEnrolled?: boolean;
  onEnroll?: (courseId: string) => void;
  showButton?: boolean;
  linkToDetail?: boolean;
}

export default function CourseCard({
  id,
  title,
  thumbnail_url,
  description,
  isEnrolled,
  onEnroll,
  showButton = false,
  linkToDetail = true,
}: CourseCardProps) {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (isEnrolled) {
      navigate(`/course-detail/${id}`);
    } else if (onEnroll) {
      onEnroll(id);
    }
  };

  const card = (
    <Card style={{background:"#fcf8f8ff"}}
    title={
    <div className="card-header">
      <h3>{title}</h3>
      {description && <p className="card-description">{description}</p>}
    </div>
  }
      

      className="course-card"
      cover={<img src={thumbnail_url} alt="thumbnail" className="course-thumbnail" />}
      actions={
        showButton
          ? [
              <Button
                type={isEnrolled ? "primary" : "link"}
                onClick={handleButtonClick}
              >
                {isEnrolled ? "Continue..." : "Enroll"}
              </Button>,
            ]
          : undefined
      }
    >
    </Card>
  );

  if (linkToDetail && isEnrolled) {
    return <div onClick={() => navigate(`/dashboard/course-detail/${id}`)}>{card}</div>;
  }

  return card;
};
