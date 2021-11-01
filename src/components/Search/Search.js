import React, { Component } from 'react';

import { Input } from 'antd';

import './Search.css';

export default class Search extends Component {
  state = {};

  // eslint-disable-next-line no-console
  onSearch = (event) => console.log(event.target.value);

  render() {
    return <Input className="search-input" placeholder="Type to search..." onChange={this.onSearch} />;
  }
}
