import React, { useState } from 'react';
import { Button, Input, Typography, Form, message } from 'antd';
import { useSetAtom } from 'jotai';
import { auth } from '@/firebase/app';
import { authModalState } from '@/store/authModalAtom';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';

const { Text } = Typography;

const ResetPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);
  const setAuthModalState = useSetAtom(authModalState);

  const handleSubmit = async (values: any) => {
    try {
      await sendPasswordResetEmail(email);
      setIsSuccess(true);
    } catch (error) {
      message.error('error');
    }
  };

  return (
    <div>
      {isSuccess ? (
        <>
          <Text>
            All good! If we have an account registered for that email, you will
            receive a link to reset your password.
          </Text>
          <Button
            type="primary"
            onClick={() =>
              setAuthModalState((prev) => ({ ...prev, open: false }))
            }
            block
            style={{ marginTop: '5px' }}
          >
            Ok
          </Button>
        </>
      ) : (
        <>
          <Text>
            {`Enter the email associated with your account, and we'll send you a
            reset link.`}
          </Text>

          <Form onFinish={handleSubmit}>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please enter your email!',
                },
                {
                  type: 'email',
                  message: 'Invalid email address',
                },
              ]}
            >
              <Input
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                size="middle"
                style={{ marginTop: '3px' }}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={sending}
                block
                style={{
                  marginTop: '3px',
                  backgroundColor: sending ? '#e6e6e6' : '#008C8C',
                }}
              >
                Reset Password
              </Button>
            </Form.Item>
          </Form>
        </>
      )}
    </div>
  );
};

export default ResetPassword;
