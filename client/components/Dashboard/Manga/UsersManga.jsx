import React, { useState, useEffect } from 'react';
import Card from '../Card';

const List = () => {
  const [state, setState] = useState({
    data: [],
    err: '',
  });

  const get = () => {
    fetch('/manga/allByUser')
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

  return (
    <div className="itemContainer">
      {!state.data.length ? <h1 style={{ margin: 'auto' }}>Nothing to show.....</h1> : state.data.map(({ thumbnail, title, id }) => (
        <Card
          thumbnail={thumbnail}
          title={title}
          key={id}
        />
      ))}
    </div>
  );
};

export default List;
