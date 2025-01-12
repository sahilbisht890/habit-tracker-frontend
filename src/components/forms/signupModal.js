import React, { useContext, useState } from "react";
import { Modal, Form, Input, Button } from "antd";
import { AppContext } from "../../createContext";
import axiosInstance from "../../utils/axios";

const SignupFormModal = ({ isFormVisible, setIsFormVisible }) => {
  const [form] = Form.useForm();
  const {setSignupView , setLoginView} = useContext(AppContext);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onFinish = async (values) => {
    setIsSubmitting(true);
    try {
      const { email, username, password } = values;
      const response = await axiosInstance.post("register", {
        email,
        username,
        password,
      });
      if (response.data.success) {
        setLoginView(true);
        setSignupView(false);
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
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Form Submission Failed:", errorInfo);
  };

  const handleLoginTypeChange = () => {
    setSignupView(false);
    setLoginView(true);
  }

  return (
    <Modal
      title="Signup"
      open={isFormVisible}
      onCancel={handleCancel}
      footer={null}
      className="rounded-lg"
      width={450}
    >
      <Form
        form={form}
        layout="vertical"
        name="signupForm"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="space-y-4"
        disabled={isSubmitting}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please enter your username!",
            },
            {
              min: 4,
              message: "Username must be at least 4 characters long!",
            },
            {
              max: 8,
              message: "Username must be less then 9 characters!",
            },
          ]}
        >
          <Input placeholder="Enter your username" className="rounded-md" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please enter your email!",
            },
            {
              type: "email",
              message: "Please enter a valid email!",
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
              message: "Please enter your password!",
            },
            {
              min: 7,
              message: "Password must be at least 7 characters long!",
            },
          ]}
        >
          <Input.Password
            placeholder="Enter your password"
            className="rounded-md"
          />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password
            placeholder="Confirm your password"
            className="rounded-md"
          />
        </Form.Item>

        <Form.Item className="text-center">
          <Button
            htmlType="submit"
            block
            className="rounded-md text-white  bg-pink-700 hover:scale-105 w-1/2"
          >
            {
               isSubmitting ? 'Loading...':'Sign Up'
            }
          </Button>
        </Form.Item>
      </Form>
      {!isSubmitting && (
        <div className="text-lg mt-2 font-semibold text-center">
          Already have a account ?{" "}
          <span
            className="text-blue-800 cursor-pointer"
            onClick={handleLoginTypeChange}
          >
            Login
          </span>
        </div>
      )}
    </Modal>
  );
};

export default SignupFormModal;
