import React from 'react';
import { Button, Input, Form, Space } from 'antd';


const SignUp: React.FC = () => {

  return (
    <Form onFinish={() => {}}>
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
            onChange={() => {}}
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
            onChange={() => {}}
            size="middle"
          />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
          ]}
        >
          <Input.Password
            name="confirmPassword"
            placeholder="Confirm password"
            onChange={() => {}}
            size="middle"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={false} block>
            Sign Up
          </Button>
        </Form.Item>
      </Space>
    </Form>
  );
};

export default SignUp;
