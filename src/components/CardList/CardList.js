import React from 'react';
import './CardList.css';
import PropTypes from 'prop-types';
import MovieCard from '../MovieCard';

const CardList = ({ movieDataFromBase }) => (
    <div className="card-list">
      <MovieCard movieDataFromBase={movieDataFromBase}  />
    </div>
  );
CardList.defaultProps = {
  movieDataFromBase: [],
};
CardList.propTypes = {
  movieDataFromBase: PropTypes.instanceOf(Array)
};
export default CardList;
