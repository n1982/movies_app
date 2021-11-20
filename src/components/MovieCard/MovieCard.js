import React from 'react';
import PropTypes from 'prop-types';
import { Card, Tag, Typography } from 'antd';
import RateStars from '../RateStars';

import './MovieCard.css';

const MovieCard = ({ movieDataFromBase, guestSessionId }) => {
  const { Text } = Typography;

  const listElements = movieDataFromBase.map((item) => {
    const { posterURL, id, filmTitle, releaseDate, overview, popularity, rating } = item;
    const tag1 = 'Action';
    const tag2 = 'Action';

    function truncate(numberSymbols, useWordBoundary) {
      if (this.length <= numberSymbols) {
        return this;
      }
      const subString = this.substring(0, numberSymbols - 1);
      return `${useWordBoundary ? subString.substring(0, subString.lastIndexOf(' ')) : subString}...`;
    }

    const overviewTruncated = truncate.apply(overview, [200, true]);

    const inputClasses = ['stars-count'];
    if (popularity >= 3 && popularity < 5) {
      inputClasses.push('orange');
    }
    if (popularity >= 5 && popularity < 7) {
      inputClasses.push('yellow');
    }
    if (popularity >= 7) {
      inputClasses.push('green');
    }

    return (
      <Card key={id} hoverable cover={<img alt="example" src={posterURL} />}>
        <div className="card-title">
          <p className="card-film-title">{filmTitle}</p>
          <div className={inputClasses.join(' ')}>{popularity.toFixed(1)}</div>
        </div>
        <Text type="secondary">{releaseDate}</Text>
        <div className="card-tags">
          <Tag>{tag1}</Tag>
          <Tag>{tag2}</Tag>
        </div>
        <Text>{overviewTruncated}</Text>
        <RateStars id={id} guestSessionId={guestSessionId} rating={rating} />
      </Card>
    );
  });

  return listElements;
};
MovieCard.defaultProps = {
  movieDataFromBase: [],
  guestSessionId: '',
};

MovieCard.propTypes = {
  movieDataFromBase: PropTypes.instanceOf(Array),
  guestSessionId: PropTypes.string,
};
export default MovieCard;
