import { Modal, Table } from "antd";
import { useEffect, useState } from "react";
import { getTeacherStudentSummary } from "../services/courseService";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

type SummaryItem = {
  student_name: string;
  total_enrollments: number;
  enrolled_course_titles: string;
  student_id:string;
};

type Props = {
  open: boolean;
  onClose: () => void;
};

const StudentSummaryModal = ({ open, onClose }: Props) => {
  const [data, setData] = useState<SummaryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const teacherId = useSelector((state: RootState) => state.auth.id);

  useEffect(() => {
    const fetchData = async () => {
      if (!open || !teacherId) return;
      setLoading(true);
      try {
        const summary = await getTeacherStudentSummary(teacherId);
        setData(summary);
      } catch (error) {
        console.error("Failed to fetch student summary", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [open, teacherId]);

  const columns = [
    {
      title: "Student Name",
      dataIndex: "student_name",
    },
    {
      title: "Courses Enrolled",
      dataIndex: "total_enrollments",
    },
  ];

  return (
    <Modal
      open={open}
      onCancel={onClose}
      onOk={onClose}
      title="Enrolled Students Summary"
      width={700}
    >
        <Table
  dataSource={data}
  columns={columns}
  rowKey={(record) => record.student_id || record.student_name}
  loading={loading}
  pagination={false}
  expandable={{
    expandedRowRender: (record) => {

      const courseString = record.enrolled_course_titles || "";
      const courses = courseString.split(",").map((title) => title.trim());

      return (
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          {courses.length > 0 && courseString.trim() !== "" ? (
            courses.map((course, index) => <li key={index}>{course}</li>)
          ) : (
            <li>No courses enrolled</li>
          )}
        </ul>
      );
    },
    rowExpandable: (record) => record.total_enrollments > 0,
  }}
/>

       </Modal>
  );
};

export default StudentSummaryModal;
