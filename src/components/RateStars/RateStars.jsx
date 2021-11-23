import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Rate } from 'antd';
import './RateStars.css';

import MovieDbService from '../../services/MovieDbService';

export default class RateStars extends Component {
  static defaultProps = {
    guestSessionId: '',
    id: 0,
  };

  static propTypes = {
    guestSessionId: PropTypes.string,
    id: PropTypes.number,
  };

  state = {
    // eslint-disable-next-line react/no-unused-state,react/destructuring-assignment,react/prop-types
    ratingValue: this.props.rating,
  };

  setMovieRating = (rate) => {
    const { guestSessionId, id } = this.props;
    const callMovieDbService = new MovieDbService();
    this.setState({
      ratingValue: rate,
    });
    if (rate === 0) callMovieDbService.deleteRateMovie(id, guestSessionId);
    callMovieDbService.setMovieRating(id, guestSessionId, rate);
  };

  render() {
    const { ratingValue } = this.state;
    return (
      <Rate
        count={10}
        value={ratingValue}
        onChange={(rate) => {
          this.setMovieRating(rate);
        }}
      />
    );
  }
}
