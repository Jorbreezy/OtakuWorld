import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import apiRequest from '../../Authentication/Util';

const Detail = ({ match }) => {
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
    title, description, chapters, status, type, thumbnail, author, genre,
  } = state;

  return (
    <div className="details">
      <div className="detailTitle">
        <h1>
          { title }
        </h1>
      </div>
      <div className="wrapper">
        <div className="detailImage">
          <img className="img" src={thumbnail} alt="ItemImage" />
        </div>
        <div className="info">
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
          <div className="cardInfo">
            <h3>
              Genre(s):
              { genre }
            </h3>
          </div>
        </div>
      </div>
      <div className="description">
        <div>
          <h2>Description</h2>
          <hr />
        </div>
        <h3>{ description }</h3>
      </div>
    </div>
  );
};

Detail.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  match: PropTypes.object.isRequired,
};

export default Detail;
