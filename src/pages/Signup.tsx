import {Card ,Form, Input, Button, Typography,message} from 'antd';
import { Link,useNavigate } from 'react-router-dom';
import { signUpUser } from '../services/authService';

import type { SignupFormValues } from '../types/auth';

const { Title } = Typography;




export default function Signup() {
    const navigate=useNavigate();
    const [form] = Form.useForm();

    const onFinish = async(values:SignupFormValues)=>{

        const{ email,password,fullName}=values;

        try{
        const{data,error}=await signUpUser ({  email,  password,  fullName});
        if(error){
            message.error(error.message)
        }else{
            message.success('Account created!')
            console.log('signup Sucess:',data);
            navigate('/')
        }
     }catch(err){
      message.error('Something went wrong during signup.');
    console.error(err);
  }
    }
  return(

    <div style={{
        height:'100vh',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    }}>
        <Card>
        <Title level={2}>Sign Up</Title>

           <Form   form={form}layout='vertical' onFinish={onFinish}>

            <Form.Item label="Full Name" name="fullName" rules={[{required:true}]}>
                <Input placeholder='Enter Your Full Name'/>
            </Form.Item>
            <Form.Item label="Email" name="email" rules={[{required:true}]}>
                <Input placeholder='Enter Your Email'/>
            </Form.Item>

            <Form.Item label="Password" name="password" rules={[{required:true}]}>
                <Input.Password/>
                </Form.Item>
                <Form.Item label="Confirm Password" name="confirm"
                dependencies={["password"]}
                rules={[{required:true,message:'Please confrim your password'},
                    ({getFieldValue})=>({
                        validator(_, value){
                            if(getFieldValue('password')===value){
                                return Promise.resolve();
                            }
                            return Promise.reject('Password do not Match!');
                        },
                    }),


                ]}
                > 
                 <Input.Password placeholder='Confrim your password'/>
                 </Form.Item>

        <Form.Item label="Profile Picture (optional)" name="profilePic">
  <input
    type="file"
    accept="image/*"
    onChange={(e) => {
      const file = e.target.files?.[0];
      form.setFieldsValue({ profilePic: file });
    }}
  />
</Form.Item>         
                    

                <Form.Item>
                    <Button type='primary' htmlType='submit' block>
                        SignUp
                    </Button>
                </Form.Item>
                If You have already account<Link to='/'> Login </Link>
        </Form>
        </Card>
    </div>
  );
}
