import React from 'react';
import './MovieCard.css';
import { Card, Rate, Tag, Typography } from 'antd';

const { Text } = Typography;

const MovieCard = () => {
  const tag1 = 'Action';
  const tag2 = 'Action';
  return (
    <Card hoverable cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>
      {/* <img className='card_movie-img' alt="example" src='https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png' /> */}
<div className="card-title">
      <p>The way back</p>
      <span className="stars-count">6.6</span>
</div>
      <Text type="secondary">March 5, 2020</Text>
      <br />
      <Tag>{tag1}</Tag>
      <Tag>{tag2}</Tag>
      <br />
      <Text>
        A former basketball all-star, who has lost his wite and family foundation in a struggle with addiction attempts
        to regain his soul and salvation by becoming the coach of a disparate ethnically mixed high ...
      </Text>
      <br />
      <Rate allowHalf defaultValue={2.5} count={10} />
    </Card>
  );
};

export default MovieCard;
