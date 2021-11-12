import React, { Component } from 'react';
import { Tabs } from 'antd';

import './Header.css';

export default class Header extends Component {
  state = {};

  // eslint-disable-next-line no-console
  onSearch = (value) => console.log(value);

  // eslint-disable-next-line no-console
  callback = (key) => console.log(key);

  render() {
    const { TabPane } = Tabs;

    return (
      <div className="header">
        <Tabs defaultActiveKey="1" onChange={this.callback}>
          <TabPane tab="Search" key="1" />

          <TabPane tab="Rated" key="2" />
        </Tabs>
      </div>
    );
  }
}
