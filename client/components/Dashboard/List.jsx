import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { useHistory } from 'react-router-dom';
import Card from './Card';
import apiRequest from '../Authentication/Util';

import FilterMenu from './Manga/FilterMenu';

const List = ({ match }) => {
  const [state, setState] = useState({
    data: [],
    err: '',
  });

  const [query, setQuery] = useState('');
  const [genre, setGenre] = useState([]);
  const [status, setStatus] = useState('');
  const [type, setType] = useState('');
  const [isLoading, setLoading] = useState(true);
  const path = match.path.split('/')[1];

  const history = useHistory();

  const get = (params = '') => {
    setTimeout(() => {
      setLoading(false);
    }, 100);

    if (path === 'favorite') {
      apiRequest(`/user/favorite${params}`)
        .then((res) => {
          if (res.status !== 200) {
            setState({ err: res.message });
          } else {
            return res.json();
          }

          return 0;
        })
        .then((res) => {
          setState({ ...state, data: res });
        })
        .catch((err) => console.log('Err: ', err));
    } else {
      apiRequest(`/manga/${params}`)
        .then((res) => {
          if (res.status !== 200) {
            setState({ err: res.message });
          } else {
            return res.json();
          }

          return 0;
        })
        .then((res) => {
          setState({ ...state, data: res });
        })
        .catch((err) => console.log('Err: ', err));
    }
  };

  useEffect(() => {
    get();
  }, []);

  const clickHandler = (e, title, id) => {
    history.push(`/${path}/${id}/${title.replace(/\s/g, '+')}`);
  };

  if (isLoading) {
    return 'Loading....';
  }

  const searchParams = () => {
    const search = new URLSearchParams();
    if (query.length > 0) search.append('title', query);
    if (status.length > 0) search.append('status', status);
    if (type.length > 0) search.append('type', type);
    if (genre.length > 0) genre.map(({ value }) => search.append('genre', value));

    history.push({
      pathname: `/${path}`,
      search: `?${search.toString()}`,
    });

    get(`?${search.toString()}`);
  };

  return (
    <>
      <FilterMenu
        setQuery={setQuery}
        setGenre={setGenre}
        setStatus={setStatus}
        setType={setType}
        getData={get}
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
              clickHandler={clickHandler}
            />
          ))}
        </div>
      </div>
    </>
  );
};

List.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  match: PropTypes.object.isRequired,
};

export default List;
