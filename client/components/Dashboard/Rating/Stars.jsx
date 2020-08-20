import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import Star from './Star';

const Stars = ({ id, click, rating }) => {
  const [previewRating, setPreviewRating] = useState();
  const [hover, setHover] = useState(true);
  const stars = [1, 2, 3, 4, 5];

  return (
    <div id="wrapper" style={{ margin: '5px' }}>
      {
        stars.map((star, idx) => (
          <Star
            // eslint-disable-next-line react/no-array-index-key
            key={idx}
            starId={idx + 1}
            // eslint-disable-next-line no-mixed-operators
            rating={hover && previewRating || rating}
            onMouseEnter={() => { setPreviewRating(idx + 1); setHover(true); }}
            onMouseLeave={() => setHover(false)}
            onClick={() => click(id, previewRating)}
          />
        ))
      }
    </div>
  );
};

Stars.propTypes = {
  id: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  click: PropTypes.func.isRequired,
};

export default Stars;
