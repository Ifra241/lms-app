import { Card,Form,Input,Button,message } from "antd";
import { Link ,useNavigate} from "react-router-dom";
import { loginUser } from "../services/authService";
import type { LoginFormValues } from "../types/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../Slice/authSlice";
import { supabase } from "../supabase/supabaseClient";
//import { useSelector } from "react-redux";
//import type { RootState } from "../store";



export default function Login(){
//const profilePic = useSelector((state: RootState) => state.auth.profilePic);


  const navigate=useNavigate();
  const dispatch=useDispatch();

  const onFinish=async(values: LoginFormValues)=>{
    const{ email,password}=values;
    try{
      const{data,error}=await loginUser({
        email,
        password,
      });
      if(error){
        message.error(error.message);
              return;

      }
      const user=data.user;
      if(!user){
        message.error("No user");
              return;

      }
      const res=await supabase.from("profiles").select("role").eq("id",user.id).single();
      const role=res.data?.role??"student";

      const profilePic = user.user_metadata?.profilePic ?? null;


      dispatch(setUser({
        id:user.id,
        email:user.email??"",
        role,
        profilePic,

      }));
      localStorage.setItem("user",JSON.stringify({
        id:user.id,
        email:user.email??"",
        role,
         profilePic, 
      }))
      message.success("Login successful");
      navigate('/dashboard')


      }catch(err){
        message.error('Something went wrong during login.');
      console.error(err);
    }
    }

  return(

    <div>
      <Card>

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
};