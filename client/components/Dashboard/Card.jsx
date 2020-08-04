import React from 'react';
import { PropTypes } from 'prop-types';

const Card = ({
  thumbnail, title, clickHandler,
}) => (
  <button type="button" className="item" onClick={(e) => clickHandler(e, title)}>
    <div className="itemWrapper" style={{ backgroundImage: `url(${thumbnail})` }}>
      <div className="itemInfo">
        <div className="itemTop" />
        <div className="itemMiddle" />
        <div className="itemTitle">
          <p>{title}</p>
        </div>
      </div>
    </div>
  </button>
);

Card.propTypes = {
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired,
};

export default Card;
