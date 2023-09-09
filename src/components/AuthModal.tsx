import React, { useEffect } from 'react';
import {
  Modal,
  Typography,
} from 'antd';
import { useAtom } from 'jotai';
import { auth } from '@/firebase/app';
import { authModalState, AuthModalView } from '@/store/authModalAtom';
import { useAuthState } from 'react-firebase-hooks/auth';
import SignIn from './SignIn';
import SignUp from './SignUp';
import ResetPassword from './ResetPassword';

const AuthModal: React.FC = () => {
  const [modalState, setModalState] = useAtom(authModalState);
  const [user] = useAuthState(auth);
console.log('----',modalState);
console.log('----',authModalState);

  const handleClose = () => {
    setModalState((prev) => ({
      ...prev,
      open: false,
    }));
  };

  useEffect(() => {
    if (user) {
      handleClose();
    }
  }, [user]);


  return (
    <>
      <Modal
        open={modalState.open}
        onCancel={handleClose}
        footer={null}
        centered
      >
        <div>
          <Typography.Title level={3} style={{ textAlign: 'center' }}>
            {modalState.view === AuthModalView.logIn && 'Log In'}
            {modalState.view === AuthModalView.signUp && 'Sign Up'}
            {modalState.view === AuthModalView.resetPassword &&
              'Reset Password'}
          </Typography.Title>
          {/* <SignIn/> */}
          {/* <SignUp/> */}
          <ResetPassword/>
        </div>
      </Modal>
    </>
  );
};

export default AuthModal;
