import React, { useState } from 'react';
// import '../../../styles/form.css';

const Form = () => {
  const [state, setState] = useState({
    manga: {
      title: '',
      description: '',
      author: '',
      chapter: 0,
      status: 0,
      thumbnail: '',
      type: 0,
    },
    type: '',
  });

  const handleChange = (e) => {
    setState({ ...state, [e.target.id]: e.target.value });
  };

  const handleClick = () => {

  };

  return (
    <div className="form">
      <label htmlFor="title">
        Title:
        <input type="text" placeholder="Enter Title" id="title" name="title" onChange={handleChange} />
      </label>
      <label htmlFor="description">
        Description:
        <input type="text" placeholder="Enter Description" id="description" name="description" onChange={handleChange} />
      </label>
      <label htmlFor="author">
        Author:
        <input type="text" placeholder="Enter Author" id="author" name="author" onChange={handleChange} />
      </label>
      <label htmlFor="Chapter">
        Chapter:
        <input type="text" placeholder="Enter Chapter" id="chapter" name="chapter" onChange={handleChange} />
      </label>
      <label htmlFor="Status">
        Status:
        <input type="text" placeholder="Enter Status" id="status" name="status" onChange={handleChange} />
      </label>
      <label htmlFor="thumbnail">
        Thumbnail:
        <input type="text" placeholder="Enter Thumbnail" id="thumbnail" name="thumbnail" onChange={handleChange} />
      </label>
      <label htmlFor="type">
        Type:
        <input type="text" placeholder="Enter Type" id="type" name="type" onChange={handleChange} />
      </label>
    </div>
  );
};

export default Form;
