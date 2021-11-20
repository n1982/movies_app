import React from 'react';
import './CardList.css';
import PropTypes from 'prop-types';
import MovieCard from '../MovieCard';

const CardList = ({ movieDataFromBase, guestSessionId }) => (
  <div className="card-list">
    <MovieCard movieDataFromBase={movieDataFromBase} guestSessionId={guestSessionId} />
  </div>
);

CardList.defaultProps = {
  movieDataFromBase: [],
  guestSessionId: '',
};

CardList.propTypes = {
  movieDataFromBase: PropTypes.instanceOf(Array),
  guestSessionId: PropTypes.string,
};

export default CardList;
