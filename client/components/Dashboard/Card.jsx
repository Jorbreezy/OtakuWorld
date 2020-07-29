import React from 'react';
import { PropTypes } from 'prop-types';

const Card = ({ thumbnail, title }) => (
  <div>
    <img className="img" src={thumbnail} alt="itemImage" />
    <h3>{ title }</h3>
  </div>
);

Card.propTypes = {
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Card;
