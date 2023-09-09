import React from 'react';
import { Button, Typography, message } from 'antd';
import { auth } from '@/firebase/app';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';

const { Text } = Typography;

const SignInWithGoogle: React.FC = () => {
  const [signInWithGoogle, loading, fbError] = useSignInWithGoogle(auth);

  const handleSignInWithGoogle = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      message.error('error');
    }
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={handleSignInWithGoogle}
        loading={false}
        block
        style={{ marginTop: '5px' }}
      >
        Continue with Google
      </Button>
      {fbError && (
        <Text type="danger" style={{ textAlign: 'center', fontSize: '10pt' }}>
          {'message'}
        </Text>
      )}
    </div>
  );
};

export default SignInWithGoogle;
