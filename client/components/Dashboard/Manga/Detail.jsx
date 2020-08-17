import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import apiRequest from '../../Authentication/Util';

import '../../../styles/detail.css';

const Detail = ({ match }) => {
  const [state, setState] = useState({});
  const [isFavorited, setFavorited] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const details = async () => {
    setTimeout(() => {
      setLoading(false);
    }, 200);

    apiRequest(`/manga/${match.params.id}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.is_favorite) setFavorited(true);

        setState(res);
        return res;
      });
  };

  useEffect(() => {
    details();
  }, []);

  const favorite = () => {
    const { id } = state;

    apiRequest('/manga/favorite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mangaId: id }),
    })
      .then(() => {
        setFavorited(true);
      })
      .catch((err) => console.log(err));
  };

  const unFavorite = () => {
    const { id } = state;

    setFavorited(false);

    apiRequest('/manga/unfavorite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mangaId: id }),
    })
      .catch((err) => console.log(err));
  };

  console.log('State: ', state);

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

  let { genre } = state;

  if (isLoading) {
    return 'Loading....';
  }

  const updateCurrentChapter = (value) => {
    const { id } = state;
    apiRequest(`/user/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentChapter: value }),
    })
      .catch((err) => console.log(err));
  };

  genre = genre.split(',');

  return (
    <div className="details">
      <section className="detailImage">
        <img className="img" src={thumbnail} alt="ItemImage" />
      </section>
      <div className="wrapper">
        <section className="info">
          <div className="detailTitle">
            <h1>
              { title }
            </h1>
          </div>
          <div className="miniBar">
            <div className="genreWrap">
              { genre.map((g) => <p className="genre">{ g }</p>) }
            </div>
            <div className="subscribe">
              { isFavorited ? (
                <div className="subscribeItem unsubscribe">
                  <span className="unfavorite"><AiFillHeart onClick={unFavorite} /></span>
                </div>
              ) : (
                <div className="subscribeItem">
                  <span className="favorite"><AiOutlineHeart onClick={favorite} /></span>
                </div>
              ) }

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
            {isFavorited ? (
              <div className="cardInfo">
                <h3>
                  Current Chapter
                </h3>
                <div className="ccWrapper">
                  <input
                    className="currentChapter"
                    defaultValue={currentChapter}
                    onKeyUp={(e) => {
                      // eslint-disable-next-line no-unused-expressions
                      e.keyCode === 13 ? updateCurrentChapter(e.target.value) : currentChapter;
                    }}
                  />
                </div>
              </div>
            )
              : ''}

          </section>
        </section>
      </div>
    </div>
  );
};

Detail.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  match: PropTypes.object.isRequired,
};

export default Detail;
