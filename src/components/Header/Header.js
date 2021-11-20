import React from 'react';
import { Tabs } from 'antd';

import './Header.css';

// eslint-disable-next-line react/prop-types
const Header = ({ onTabChange }) => {
  const { TabPane } = Tabs;

  return (
    <div className="header">
      <Tabs defaultActiveKey="1" onChange={onTabChange}>
        <TabPane tab="Search" key="1" />
        <TabPane tab="Rated" key="2" />
      </Tabs>
    </div>
  );
};

export default Header;
