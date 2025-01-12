import React , {useContext , useState} from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { AppContext } from '../../createContext';
import axiosInstance from "../../utils/axios";
import { toast } from 'react-hot-toast';

const LoginFormModal = ({ isFormVisible , setIsFormVisible }) => {
  const [form] = Form.useForm();
  const {setState ,setSignupView , setLoginView} = useContext(AppContext);
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onFinish = async (values) => {
    setIsSubmitting(true);
    try {
      const { email, password } = values;
      const response = await axiosInstance.post("login", {
        email,
        password,
      });
      if (response.data.success) {
          const user = response.data.user ;
          setState((prevState) => ({
            ...prevState,
            user: user,
            isAuthenticated : true
          }));
          setLoginView(false);
      }
    } catch (error) {
      console.log("Error while registering user", error);
    } finally {
      setIsSubmitting(false);
    }

  };
  const handleCancel = () => {
    form.resetFields();
    setIsFormVisible(false);
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Form Submission Failed:', errorInfo); 
  };

  
  const handleLoginTypeChange = () => {
    setSignupView(true);
    setLoginView(false);
  }

  return (
    <Modal
      title="Login"
      open={isFormVisible}
      onCancel={handleCancel} 
      footer={null} 
      className="rounded-lg"
      width={450} 
    >
      <Form
        form={form}
        layout="vertical"
        name="loginForm"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="space-y-3"
        disabled={isSubmitting}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please enter your email!',
            },
            {
              type: 'email',
              message: 'Please enter a valid email!',
            },
          ]}
        >
          <Input placeholder="Enter your email" className="rounded-md" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please enter your password!',
            },
            {
              min: 7,
              message: 'Password must be at least 7 characters long!',
            },
          ]}
        >
          <Input.Password placeholder="Enter your password" className="rounded-md" />
        </Form.Item>

        <Form.Item className='text-center'>
          <Button  htmlType="submit" block className="rounded-md text-white bg-pink-700 hover:scale-105 w-1/2">
          {
            isSubmitting ? 'Loading...':'Login'
          }
          </Button>
        </Form.Item>
      </Form>
      {
        !isSubmitting && <div className='text-blue-600 text-lg font-semibold mt-2 cursor-pointer text-center' onClick={handleLoginTypeChange}>
        Create New Account 
     </div>
      }
    </Modal>
  );
};

export default LoginFormModal;
