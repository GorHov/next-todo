import React, { useState } from 'react';
import { Button, Input, Form, Space, Typography } from 'antd';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/app';

const { Text } = Typography;

const SignIn: React.FC = () => {
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });
  const [signInWithEmailAndPassword] =
    useSignInWithEmailAndPassword(auth);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    signInWithEmailAndPassword(loginForm.email, loginForm.password);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
      <Form onFinish={handleSubmit}>
        <Space direction="vertical" size={8} style={{ width: '100%' }}>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Please enter your email!',
              },
            ]}
          >
            <Input
              name="email"
              placeholder="Email"
              type="email"
              onChange={handleChange}
              size="middle"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please enter your password!',
              },
            ]}
          >
            <Input.Password
              name="password"
              placeholder="Password"
              onChange={handleChange}
              size="middle"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={false} block>
              Log In
            </Button>
          </Form.Item>
        </Space>
      </Form>
  );
};

export default SignIn;
