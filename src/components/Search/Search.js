import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

import './Search.css';
// eslint-disable-next-line no-unused-vars
import debounce from 'lodash.debounce';

export default class Search extends Component {
  static defaultProps = {
    onInputChange: () => {},
  };

  static propTypes = {
    onInputChange: PropTypes.func,
  };

  onSearch = (event) => {
    const { onInputChange } = this.props;
    const trimUserRequest = event.target.value.replace(/ +/g, ' ').trim();
    onInputChange(trimUserRequest);
  };

  render() {
    return <Input placeholder="Type to search..." size="large" onChange={debounce(this.onSearch, 1000)} />;
  }
}
