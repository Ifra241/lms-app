import { Card,Form,Input,Button,message } from "antd";
import { Link ,useNavigate} from "react-router-dom";
import { loginUser } from "../Services/authService";
import type { LoginFormValues } from "../Types/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../Store/Slice/authSlice";
import { supabase } from "../supabase/supabaseClient";
import "../styles/login.css"


        export default function Login() {
                 const navigate = useNavigate();
                  const dispatch = useDispatch();

  const onFinish = async (values: LoginFormValues) => {
    const { email, password } = values;
    try {
      const { data, error } = await loginUser({ email, password });
      if (error) {
        message.error(error.message);
        return;
      }

      const user = data.user;
      if (!user) {
        message.error("No user");
        return;
      }

      const res = await supabase
        .from("profile")
        .select("role")
        .eq("id", user.id)
        .single();
      const role = res.data?.role ?? "student";

      dispatch(
        setUser({
          id: user.id,
          email: user.email ?? "",
          role,
        })
      );

      message.success("Login successful");

      if (role === "admin") {
        navigate("/admin/");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      message.error("Something went wrong during login.");
      console.error(err);
    }
  };

  return (
    <div className="login-wrapper">
      <Card className="login-card">
        <h2>Welcome Back</h2>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, type: "email", message: "Enter your valid email" }]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Enter your Password" }]}
          >
            <Input.Password placeholder="Enter Your Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form.Item>
          <div className="login-link">
            Don't have an account? <Link to="/signup">Signup</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
}
