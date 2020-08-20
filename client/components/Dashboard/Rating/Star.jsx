import React from 'react';
import { FaStar } from 'react-icons/fa';
import { PropTypes } from 'prop-types';

const Rating = ({
  rating, starId, onMouseEnter, onMouseLeave, onClick,
}) => (
  <FaStar
    size={24}
    className="star"
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    onClick={onClick}
    color={(rating >= starId ? '#FFC107' : '#e4e5e9')}
  />
);

Rating.propTypes = {
  rating: PropTypes.number.isRequired,
  starId: PropTypes.number.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Rating;
