import { Card, Col, Row, Statistic } from "antd";
import { Link } from "react-router-dom";

type AdminStats = {
  totalCourses: number;
  totalTeachers: number;
  totalStudents: number;
};



const AdminStats=({totalCourses,totalTeachers,totalStudents}:AdminStats)=>{

    return(
        <>
        <Row gutter={[16,16]}>
            <Col span={8}>
              <Link to="/admin/teachers">
               <Card  className="Total_Card">
      <Statistic 
        title="Total Teachers"
        value={totalTeachers}
        valueStyle={{ color: "#006d86ff" }}
      />
      
    </Card>


            
            </Link>
            
            </Col>
            <Col span={8}>
            <Link to="/admin/courses">
             <Card  className="Total_Card">
      <Statistic 
        title="Total Courses"
        value={totalCourses}
        valueStyle={{ color: "#04a0c3ff" }}
      />
      
    </Card>
            
    
            </Link>
            </Col>

            <Col span={8}>
            <Link to="/admin/students">
            <Card className="Total_Card">
      <Statistic 
        title="Total Students"
        value={totalStudents}
        valueStyle={{ color: "#026277ff" }}
      />
      
    </Card>
              
            </Link>
            </Col>
            
        </Row>
        </>


    );
}
export default AdminStats;