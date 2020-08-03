import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import apiRequest from '../../Authentication/Util';

const Card = ({ match }) => {
  const [state, setState] = useState({});

  const getSingleManga = async () => {
    await apiRequest('/manga/all')
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }

        return 0;
      })
      .then((res) => {
        const data = res.filter(({ title }) => title === match.params.qtitle.replace(/\+/g, ' '));

        setState(data[0]);
      })
      .catch((err) => console.log('Err: ', err));
  };

  useEffect(() => {
    getSingleManga();
  }, []);

  const {
    title, description, chapters, status, type, thumbnail, author,
  } = state;

  return (
    <div className="singleItem">
      <div className="wrapper">
        <div className="itemImage">
          <img className="img" src={thumbnail} alt="ItemImage" />
        </div>
        <div className="info">
          <div className="cardInfo">
            <h3>
              Title:
              { title }
            </h3>
          </div>
          <div className="cardInfo">
            <h3>
              Author:
              { author }
            </h3>
          </div>
          <div className="cardInfo">
            <h3>
              Chapters:
              { chapters }
            </h3>
          </div>
          <div className="cardInfo">
            <h3>
              Status:
              {status }
            </h3>
          </div>
          <div className="cardInfo">
            <h3>
              Type:
              { type }
            </h3>
          </div>
        </div>
      </div>
      <div className="description">
        <h3>{ description }</h3>
      </div>
    </div>
  );
};

Card.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  match: PropTypes.object.isRequired,
};

export default Card;
