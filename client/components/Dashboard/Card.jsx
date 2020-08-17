import React from 'react';
import { PropTypes } from 'prop-types';

const Card = ({
  thumbnail, title, clickHandler, id,
}) => (
  <button type="button" className="item" onClick={(e) => clickHandler(e, title, id)}>
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
  id: PropTypes.number.isRequired,
};

export default Card;
