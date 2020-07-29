import React, { useState, useEffect } from 'react';
import Card from './Card';

const List = () => {
  const [state, setState] = useState({
    data: [],
    err: '',
  });

  const get = () => {
    fetch('/manga/all')
      .then((res) => {
        if (res.status !== 200) {
          setState({ err: res.message });
        } else {
          setState({ data: res.json() });
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    get();
  });

  return (
    <div>
      {state.data.map(({ thumbnail, title, id }) => (
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
