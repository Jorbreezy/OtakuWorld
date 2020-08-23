import React from 'react';
import { PropTypes } from 'prop-types';
import './styles/card.css';

const Card = ({
  thumbnail,
  title,
  clickHandler,
  id,
}) => (
  <button type="button" className="item" onClick={() => clickHandler(title, id)}>
    <div className="itemWrapper" style={{ backgroundImage: `url(${thumbnail})` }}>
      <div className="itemInfo">
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
