import React from 'react';
import './MovieCard.css';
import { Card, Rate, Tag, Typography } from 'antd';
import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';

const { Text } = Typography;

const MovieCard = ({ movieDataFromBase }) => {
  const listElements = movieDataFromBase.map((item) => {
    const tag1 = 'Action';
    const tag2 = 'Action';
    const { posterURL, id, filmTitle, releaseDate, overview, popularity } = item;

    const releaseDateFormatted = format(parseISO(releaseDate), 'MMMM dd, yyyy');

    function truncate(numberSymbols, useWordBoundary) {
      if (this.length <= numberSymbols) {
        return this;
      }
      const subString = this.substring(0, numberSymbols - 1);
      return `${useWordBoundary ? subString.substring(0, subString.lastIndexOf(' ')) : subString}...`;
    }

    const overviewTruncated = truncate.apply(overview, [200, true]);
    const popularityRounding = Math.floor(popularity * 10) / 10;

    return (
      <Card key={id} hoverable cover={<img alt="example" src={posterURL} />}>
        <div className="card-title">
          <p className="card-film-title">{filmTitle}</p>
          <div className="stars-count">{popularityRounding}</div>
        </div>
        <Text  type="secondary">{releaseDateFormatted}</Text>
      <div>
        <Tag>{tag1}</Tag>
        <Tag>{tag2}</Tag>
        </div>
        <Text>{overviewTruncated}</Text>
        <Rate allowHalf defaultValue={2.5} count={10} />
      </Card>
    );
  });

  return listElements;
};
MovieCard.defaultProps = {
  movieDataFromBase: [],
};
MovieCard.propTypes = {
  movieDataFromBase: PropTypes.instanceOf(Array),
};
export default MovieCard;
