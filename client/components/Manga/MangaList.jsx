import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { useHistory } from 'react-router-dom';
import Card from './Card';
import apiRequest from '../Authentication/apiRequest';
import './styles/list.css';

import FilterMenu from '../Filter/FilterMenu';

const MangaList = ({ match }) => {
  const [state, setState] = useState({
    data: [],
    err: '',
  });

  const getFavorites = (params) => {
    apiRequest(`/api/user/favorite${params}`)
      .then(async (res) => {
        const data = await res.json();
        if (res.status !== 200) {
          throw data.message;
        }
        setState({ ...state, data });
      })
      .catch((err) => {
        console.error('Err: ', err);
        setState({ err });
      });
  };

  const getAll = (params) => {
    apiRequest(`/api/manga/${params}`)
      .then(async (res) => {
        const data = await res.json();
        if (res.status !== 200) {
          throw data.message;
        }

        setState({ ...state, data });
      })
      .catch((err) => {
        console.error('Err: ', err);
        setState({ err });
      });
  };

  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState([]);
  const [status, setStatus] = useState('');
  const [type, setType] = useState('');
  const path = match.path.split('/')[1];

  const history = useHistory();

  const getData = (params = '') => {
    switch (path) {
      case 'favorite':
        getFavorites(params);
        break;
      default:
        getAll(params);
    }
  };

  useEffect(() => {
    getData();
  }, [match.path]);

  const moreDetails = (title, id) => {
    history.push(`/manga/${id}/${title.replace(/\s/g, '+')}`);
  };

  const searchParams = () => {
    const search = new URLSearchParams();
    if (query.length > 0) search.append('title', query);
    if (status.length > 0) search.append('status', status);
    if (type.length > 0) search.append('type', type);
    if (genre.length > 0) genre.forEach(({ value }) => search.append('genre', value));

    history.push({
      pathname: `/${path}`,
      search: `?${search.toString()}`,
    });

    getData(`?${search.toString()}`);
  };

  return (
    <>
      <FilterMenu
        setQuery={setQuery}
        setGenre={setGenre}
        setStatus={setStatus}
        setType={setType}
        searchParam={searchParams}
      />
      <div className="itemContainer">
        <div className="listWrapper">
          {state.data.map(({ thumbnail, title, id }) => (
            <Card
              thumbnail={thumbnail}
              title={title}
              key={id}
              id={id}
              clickHandler={moreDetails}
            />
          ))}
        </div>
      </div>
    </>
  );
};

MangaList.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ id: PropTypes.number }),
    path: PropTypes.string,
  }).isRequired,
};

export default MangaList;
