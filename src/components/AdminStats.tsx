import { Card, Col, Row } from "antd";
import { Link } from "react-router-dom";

type AdminStats = {
  totalCourses: number;
  totalTeachers: number;
  totalStudents: number;
};



const AdminStats=({totalCourses,totalTeachers,totalStudents}:AdminStats)=>{

    return(
        <Row gutter={[16,16]}>
            <Col span={8}>
              <Link to="/admin/courses">
            <Card title="Total Courses">
                {totalCourses}
                
            </Card>
            </Link>
            
            </Col>
            <Col span={8}>
            <Link to="/admin/teachers">
            <Card title="Total Teachers">
                {totalTeachers}
            </Card>
            </Link>
            </Col>
            <Col span={8}>
            <Link to="/admin/students">
            <Card title="Total Students">
                {totalStudents}
            </Card>
            </Link>
            
            </Col>
        </Row>


    );
}
export default AdminStats;