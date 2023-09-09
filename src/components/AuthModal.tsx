import React, { useEffect } from "react";
import { Button, Modal, Typography, Space, Divider } from "antd";
import { useAtom } from "jotai";
import { auth } from "@/firebase/app";
import { authModalState, AuthModalView } from "@/store/authModalAtom";
import ResetPassword from "./ResetPassword";
import SignUp from "./SignUp";
import { useAuthState } from "react-firebase-hooks/auth";
import SignIn from "./SignIn";
import SignInWithGoogle from "./SignInWithGoogle";

const { Text } = Typography;

const AuthModal: React.FC = () => {
  const [modalState, setModalState] = useAtom(authModalState);
  const [user] = useAuthState(auth);

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
        centered
        footer={null}
      >
        <div style={{ textAlign: "center" }}>
          <h2 style={{ color: "ocean-dark" }}>
            {modalState.view === AuthModalView.logIn && "Log In"}
            {modalState.view === AuthModalView.signUp && "Sign Up"}
            {modalState.view === AuthModalView.resetPassword &&
              "Reset Password"}
          </h2>
          <Divider style={{ backgroundColor: "ocean-dark" }} />
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Space direction="vertical" size={6} style={{ width: "80%" }}>
            {modalState.view === AuthModalView.logIn && (
              <>
                <SignInWithGoogle />
                <Text>OR</Text>
                <Divider />
                <SignIn />
              </>
            )}
            {modalState.view === AuthModalView.signUp && <SignUp />}
            {modalState.view === AuthModalView.resetPassword && (
              <ResetPassword />
            )}
          </Space>
        </div>

        <div
          style={{ textAlign: "center", fontSize: "10pt", paddingTop: "10px" }}
        >
          {(modalState.view === AuthModalView.logIn ||
            modalState.view === AuthModalView.signUp) && (
            <Text>
              {modalState.view === AuthModalView.signUp
                ? "Have an account?"
                : "New here?"}
            </Text>
          )}
          <Space>
            <Button
              type="link"
              onClick={() =>
                setModalState((prev) => ({
                  ...prev,
                  view:
                    modalState.view !== AuthModalView.logIn
                      ? AuthModalView.logIn
                      : AuthModalView.signUp,
                }))
              }
            >
              {modalState.view === AuthModalView.signUp && "Log In"}
              {modalState.view === AuthModalView.logIn && "Create an account"}
              {modalState.view === AuthModalView.resetPassword &&
                "< Back to Log In"}
            </Button>
            {(modalState.view === AuthModalView.signUp ||
              modalState.view === AuthModalView.logIn) && (
              <>
                <Divider type="vertical" />
                <Text>Forgot password?</Text>
                <Button
                  type="link"
                  onClick={() =>
                    setModalState((prev) => ({
                      ...prev,
                      view: AuthModalView.resetPassword,
                    }))
                  }
                >
                  Reset password
                </Button>
              </>
            )}
          </Space>
        </div>
      </Modal>
    </>
  );
};

export default AuthModal;
