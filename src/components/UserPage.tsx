import React, { useState } from 'react';
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme, Button } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

const UserPage: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [selectedMenuItem, setSelectedMenuItem] = useState('1'); // Default selected menu item

  const handleMenuSelect = (e: { key: React.Key }) => {
    setSelectedMenuItem(e.key.toString());
  };

  const handleLogout = () => {
    // Add your logout logic here
    console.log('Logged out'); // Replace with your actual logout logic
  };

  let content = null;

  switch (selectedMenuItem) {
    case '1':
      content = (
        <div style={{ padding: 24, height: '82vh', background: colorBgContainer }}>
          Content 1
        </div>
      );
      break;
    case '2':
      content = (
        <div style={{ padding: 24, height: '82vh', background: colorBgContainer }}>
          Content 2
        </div>
      );
      break;
    default:
      content = null;
  }

  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedMenuItem]}
          onSelect={handleMenuSelect}
        >
          {[UserOutlined, VideoCameraOutlined].map(
            (icon, index) => (
              <Menu.Item key={String(index + 1)} icon={React.createElement(icon)}>
                Menu {index + 1}
              </Menu.Item>
            )
          )}
        </Menu>
        <Footer style={{ textAlign: 'center'}}>
          <Button
            type="primary"
            icon={<LogoutOutlined />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Footer>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '24px 16px 0' }}>{content}</Content>
      </Layout>
    </Layout>
  );
};

export default UserPage;
