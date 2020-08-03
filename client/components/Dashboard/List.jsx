import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Card from './Card';
import apiRequest from '../Authentication/Util';

const List = () => {
  const [state, setState] = useState({
    data: [],
    err: '',
  });

  const history = useHistory();

  const get = () => {
    apiRequest('/manga/all')
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
  };

  useEffect(() => {
    get();
  }, []);

  const clickHandler = (e, title) => {
    history.push(`/discover/${title.replace(/\s/g, '+')}`);
  };

  return (
    <div className="itemContainer">
      {state.data.map(({ thumbnail, title, _id: id }) => (
        <Card
          thumbnail={thumbnail}
          title={title}
          key={id}
          clickHandler={clickHandler}
        />
      ))}
    </div>
  );
};

export default List;
