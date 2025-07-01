import { Card,Form,Input,Button,Typography, message } from "antd";
import { Link ,useNavigate} from "react-router-dom";
import { loginUser } from "../services/authService";
import type { LoginFormValues } from "../types/auth";
const{ Title }=Typography



export default function Login(){
  const navigate=useNavigate();

  const onFinish=async(values: LoginFormValues)=>{
    const{ email,password}=values;
    try{
      const{data,error}=await loginUser({
        email,
        password,
      });
      if(error){
        message.error(error.message);
      }else{
        message.success('Login Successful!');
        console.log('Login sucessfull',data);
        navigate('/dashboard')
      }
      }catch(err){
        message.error('Something went wrong during login.');
      console.error(err);
    }
    }

  return(

    <div>
      <Card>
        <Title level={2}>Login</Title>
     <Form layout="vertical" onFinish={onFinish}>
      <Form.Item label="Email" name="email" rules={[{required:true,type:"email",message:'Enter your valid email'}]}>
        <Input placeholder="Enter your email"/>
      </Form.Item>
      <Form.Item label="Password" name='password' rules={[{required:true,message:'Enter your Password'}]}>
        <Input.Password placeholder="Enter Your Password"/>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" block>Login</Button>
      </Form.Item>
      If u dont have account<Link to='/signup'> Signup </Link>

     </Form>

      </Card>
    </div>
  );
}