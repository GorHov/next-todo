import React from 'react';
import { Button, Typography, Row, Col } from 'antd';
import { auth } from '@/firebase/app';
import { useAuthState } from 'react-firebase-hooks/auth';
import AuthButtons from '@/components/AuthButtons';
import UserPage from '@/components/UserPage';

const { Text, Title } = Typography;

const Home = () => {
  const [user, loading] = useAuthState(auth);

  return (
    <>
    {!user ? 
    <Row
      justify="center"
      align="middle"
      style={{
        textAlign: 'center',
      }}
    >
      <Col xs={24} sm={18} md={12} lg={8} xl={6}>
        <img
          src="react-firebase.svg"
          alt="Firebase React Logo"
          width="90px"
          style={{ alignSelf: 'center' }}
        />
        <Title level={4} style={{ marginTop: '1rem', fontWeight: 700 }}>
          Home
        </Title>
        <Text style={{ fontSize: '14pt', marginTop: '2rem' }}>
          '🙅‍♀️ You are not signed in yet.'
        </Text>
        <AuthButtons/>
      </Col>
    </Row> : 
    <UserPage/>}
    </>
  );
};

export default Home;
