import React from 'react';
import { PropTypes } from 'prop-types';

const Card = ({ thumbnail, title }) => (
  <div className="item">
    <div className="cardImg">
      <img className="img" src={thumbnail} alt="ItemImage" />
    </div>
    <div className="cardTitle">
      <h3>{ title }</h3>
    </div>
  </div>
);

Card.propTypes = {
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Card;
