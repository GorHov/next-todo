import React, { useState } from "react";
import { Button, Input, Form, Space } from "antd";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/app";

const SignUp: React.FC = () => {
  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

    if (error) setError("");

    if (signUpForm.password !== signUpForm.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,256}$/gm;
    if (!passwordRegex.test(signUpForm.password)) {
      setError(
        "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character."
      );
      return;
    }

    createUserWithEmailAndPassword(signUpForm.email, signUpForm.password);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <Form onFinish={handleSubmit}>
      <Space direction="vertical" size={8} style={{ width: "100%" }}>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please enter your email!",
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
              message: "Please enter your password!",
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
        <Form.Item
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
          ]}
        >
          <Input.Password
            name="confirmPassword"
            placeholder="Confirm password"
            onChange={handleChange}
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
