import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

import './Search.css';
// eslint-disable-next-line no-unused-vars
import debounce from 'lodash.debounce';

export default class Search extends Component {
  static defaultProps = {
    getMoviesData: () => {},
  };

  static propTypes = {
    getMoviesData: PropTypes.func,
  };

  onSearch = (event) => {
    const { getMoviesData } = this.props;
    const trimUserRequest = event.target.value.replace(/ +/g, ' ').trim();

    if (trimUserRequest !== '') {
      getMoviesData(trimUserRequest);
    }
  };

  render() {
    return <Input placeholder="Type to search..." size = "large" onChange={debounce(this.onSearch, 500)}/>
    // return <Input className="search-input" placeholder="Type to search..." onChange={debounce(this.onSearch, 500)} />;
  }
}
