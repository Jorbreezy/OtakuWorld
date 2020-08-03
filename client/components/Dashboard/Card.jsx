import React from 'react';
import { PropTypes } from 'prop-types';

const Card = ({
  thumbnail, title, clickHandler,
}) => (
  <button type="button" className="item" onClick={(e) => clickHandler(e, title)}>
    <div className="cardImg">
      <img className="img" src={thumbnail} alt="ItemImage" />
    </div>
    <div className="cardTitle">
      <p className="title">{ title }</p>
    </div>
  </button>
);

Card.propTypes = {
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired,
};

export default Card;
