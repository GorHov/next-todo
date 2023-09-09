import React from 'react';
import { Button } from 'antd';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/app';
import { signOut } from 'firebase/auth';
import { useSetAtom } from 'jotai';
import {
  authModalState as authModalAtom,
  AuthModalView,
} from '@/store/authModalAtom';

const AuthButtons: React.FC = () => {
  const setAuthModalState = useSetAtom(authModalAtom);
  const [user] = useAuthState(auth);
  
  return (
    <div>
      {user ? (
        <Button
          type="primary"
          style={{ maxWidth: '300px', margin: '0 auto' }}
          onClick={() => signOut(auth)}
        >
          Log Out
        </Button>
      ) : (
        <>
          <Button
            type="primary"
            onClick={() =>
              setAuthModalState({ open: true, view: AuthModalView.logIn })
            }
          >
            Log In
          </Button>
          <Button
            type="default"
            onClick={() =>
              setAuthModalState({ open: true, view: AuthModalView.signUp })
            }
          >
            Sign up
          </Button>
        </>
      )}
    </div>
  );
};

export default AuthButtons;
