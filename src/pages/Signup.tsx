import {Card ,Form, Input, Button, Typography,message, Upload} from 'antd';
import { Link,useNavigate } from 'react-router-dom';
import { signUpUser, uploadProfilePic} from '../Services/authService';
import { UploadOutlined } from "@ant-design/icons";
import "../styles/login.css"



import type { SignupFormValues } from '../Types/auth';

const { Title } = Typography;




export default function Signup() {
    const navigate=useNavigate();
    const [form] = Form.useForm();

    const onFinish = async(values:SignupFormValues&{profilePic?:File})=>{
        

        const{ email,password,fullName}=values;
        
        try{
            
            let profilePicUrl=null;
            if(values.profilePic){
                profilePicUrl=await uploadProfilePic(values.profilePic);
                  console.log("Uploaded profilePicUrl:", profilePicUrl);

            }
           

    
        const res=await signUpUser ({  email,  password,  fullName,profilePicUrl:profilePicUrl,})
            message.success('Account created!')
            console.log('signup Sucess:',res);
            navigate('/')
        
     }catch(err){
      message.error('Something went wrong during signup.');
    console.error(err);
  }
    };
  return(

    <div className="login-wrapper">
        <Card className="login-card">
        <Title level={2}>Sign Up</Title>

           <Form   form={form}layout='vertical' onFinish={onFinish}>

            <Form.Item label="Full Name" name="fullName" rules={[{required:true}]}>
                <Input placeholder='Enter Your Full Name'/>
            </Form.Item>
            <Form.Item label="Email" name="email" rules={[{required:true}]}>
                <Input placeholder='Enter Your Email'/>
            </Form.Item>

            <Form.Item label="Password" name="password" rules={[{required:true, message:"Please enter your password"},{min:6,message:"Password must be at least 6 characters"}]}>
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

       <Form.Item
  label="Profile Picture (optional)"
  name="profilePic"
  valuePropName="file"
  getValueFromEvent={(e) => {
    return e?.fileList?.[0]?.originFileObj || null;
  }}
>
     <Upload beforeUpload={() => false} maxCount={1} showUploadList={true}>
    <Button icon={<UploadOutlined />}>Select File</Button>
  </Upload>



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
};
