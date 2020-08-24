import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import apiRequest from '../Utils/apiRequest';
import Stars from '../Rating/Stars';

import './styles/detail.css';

const MangaDetail = ({ match }) => {
  const [state, setState] = useState({});
  const [isLoading, setLoading] = useState(true);

  const getDetails = async () => {
    setTimeout(() => {
      setLoading(false);
    }, 100);

    apiRequest(`/api/manga/${match.params.id}`)
      .then((res) => res.json())
      .then((res) => {
        setState(res);
        return res;
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getDetails();
  }, []);

  const favorite = () => {
    const { id } = state;

    apiRequest('/api/user/favorite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mangaId: id }),
    })
      .then(() => {
        setState({ ...state, is_favorite: true });
      })
      .catch((err) => console.error(err));
  };

  const unFavorite = () => {
    const { id } = state;

    apiRequest('/api/user/unfavorite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mangaId: id }),
    })
      .then(() => {
        setState({ ...state, is_favorite: false });
      })
      .catch((err) => console.error(err));
  };

  const {
    title,
    description,
    chapters,
    status,
    type,
    thumbnail,
    author,
    current_chapter: currentChapter,
  } = state;

  const { genres = [] } = state;

  if (isLoading) {
    return 'Loading....';
  }

  const updateCurrentChapter = (value) => {
    const { id } = state;
    apiRequest(`/api/user/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentChapter: value }),
    })
      .catch((err) => console.error(err));
  };

  const rate = (id, rating) => {
    apiRequest('/api/manga/rate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, rating }),
    })
      .then(() => {
        setState({ ...state, rating });
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="details">
      <section className="detailImage">
        <img className="img" src={thumbnail} alt="ItemImage" />
      </section>
      <div className="wrapper">
        <section className="info">
          <h1>
            { title }
          </h1>
          <div className="ratingWrap">
            <Stars id={state.id || 0} click={rate} rating={parseInt(state.rating, 10) || 0} />
          </div>
          <div className="miniBar">
            <div className="genreWrap">
              { genres.map((g) => <p className="genre" key={g}>{ g }</p>) }
            </div>
            <div className="subscribe">
              <div className="subscribeItem">
                <span>
                  { state.is_favorite ? (
                    <AiFillHeart onClick={unFavorite} />
                  ) : (
                    <AiOutlineHeart onClick={favorite} />
                  ) }
                </span>
              </div>
            </div>
          </div>
          <div className="description">
            <h3>{ description }</h3>
          </div>
          <section className="infoSection">
            <div className="cardInfo">
              <h3>
                Author
              </h3>
              <h3>
                {author}
              </h3>
            </div>
            <div className="cardInfo">
              <h3>
                Chapters
              </h3>
              <h3>
                {chapters}
              </h3>
            </div>
            <div className="cardInfo">
              <h3>
                Status
              </h3>
              <h3>
                {status}
              </h3>
            </div>
            <div className="cardInfo">
              <h3>
                Type
              </h3>
              <h3>
                {type}
              </h3>
            </div>
            {state.is_favorite && (
              <div className="cardInfo">
                <h3>
                  Current Chapter
                </h3>
                <div className="ccWrapper">
                  <input
                    className="currentChapter"
                    defaultValue={currentChapter}
                    onKeyUp={({ keyCode, target: { value } }) => {
                      if (keyCode === 13) {
                        updateCurrentChapter(value);
                      }
                    }}
                  />
                </div>
              </div>
            )}
          </section>
        </section>
      </div>
    </div>
  );
};

MangaDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ id: PropTypes.string }),
    path: PropTypes.string,
  }).isRequired,
};

export default MangaDetail;
