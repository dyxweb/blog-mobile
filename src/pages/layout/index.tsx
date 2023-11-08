/**
 * layout
 */
import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { TabBar } from 'antd-mobile';
import { AppOutline, UserOutline } from 'antd-mobile-icons';
import styles from './index.scss';

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeKey, setActiveKey] = useState(location.pathname); // 激活的key

  // 点击切换路由
  const onTabBarChange = (key: string) => {
    setActiveKey(key);
    navigate(key);
  };

  const tabs = [
    {
      key: '/home',
      title: '首页',
      icon: <AppOutline />
    },
    {
      key: '/my',
      title: '我的',
      icon: <UserOutline />
    }
  ];
  return (
    <div className={styles.layout}>
      <div className={styles.content}>
        <Outlet />
      </div>
      <div className={styles.tabBar}>
        <TabBar onChange={onTabBarChange} activeKey={activeKey}>
          {tabs.map(item => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </TabBar>
      </div>
    </div>
  );
};

export default Layout;
