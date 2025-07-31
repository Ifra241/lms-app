import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";

interface User {
  id: string;
  full_name: string;
  email: string;
  role: string;
  calculatedRole: string;
}
interface Props {
  users: User[];
  onUserClick: (user: User) => void;
}

const UserTabel = ({ users, onUserClick }: Props) => {
  const columns: ColumnsType<User> = [
    {
      title: "Full name",
      dataIndex: "full_name",
      key: "full_name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "calculatedRole",
      key: "role",
    },
  ];

  return (
    <Table
      dataSource={users}
      columns={columns}
      pagination={false}
      rowKey="id"
      onRow={(record) => ({
        onClick: () => onUserClick(record),
        style: { cursor: "pointer" },
      })}
    />
  );
};

export default UserTabel;
