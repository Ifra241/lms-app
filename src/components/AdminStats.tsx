import { Card, Col, Row } from "antd";

type AdminStats = {
  totalCourses: number;
  totalTeachers: number;
  totalStudents: number;
};



const AdminStats=({totalCourses,totalTeachers,totalStudents}:AdminStats)=>{

    return(
        <Row gutter={[16,16]}>
            <Col span={8}>
            <Card title="Total Courses">
                {totalCourses}
            </Card>
            </Col>
            <Col span={8}>
            <Card title="Total Teachers">
                {totalTeachers}
            </Card>
            </Col>
            <Col span={8}>
            <Card title="Total Students">
                {totalStudents}
            </Card>
            
            </Col>
        </Row>


    );
}
export default AdminStats;