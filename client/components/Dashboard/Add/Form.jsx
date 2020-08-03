/* eslint-disable max-len */
import React, { useState } from 'react';
import '../../../styles/form.css';
import apiRequest from '../../Authentication/Util';

const Form = () => {
  const [state, setState] = useState({
    manga: {
      title: '',
      description: '',
      author: '',
      chapters: 0,
      status: 0,
      thumbnail: '',
      type: 0,
    },
    type: ['Manga', 'Webtoon', 'Manhwa'],
    status: ['Completed', 'Ongoing'],
  });

  const handleChange = (e) => {
    const newManga = {
      ...state.manga,
      [e.target.id]: e.target.value,
    };
    setState({ ...state, manga: newManga });
  };

  const handleClick = () => {
    const {
      title,
      description,
      author,
      chapters,
      status,
      thumbnail,
      type,
    } = state.manga;

    apiRequest('/manga/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        description,
        author,
        chapters,
        status,
        thumbnail,
        type,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          alert('Added Successfully');
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="formWrapper">
      <div className="form">
        <label htmlFor="title">
          Title:
          <div className="formInputDiv">
            <input type="text" placeholder="Enter Title" id="title" name="title" onChange={handleChange} />
          </div>
        </label>
        <label htmlFor="description">
          Description:
          <div className="formInputDiv">
            <textarea id="description" placeholder="Enter Description" name="description" onChange={handleChange} />
          </div>
        </label>
        <label htmlFor="author">
          Author:
          <div className="formInputDiv">
            <input type="text" placeholder="Enter Author" id="author" name="author" onChange={handleChange} />
          </div>
        </label>
        <label htmlFor="Chapter">
          Chapter:
          <div className="formInputDiv">
            <input type="number" placeholder="Enter Chapters" id="chapters" name="chapters" onChange={handleChange} />
          </div>
        </label>
        <label htmlFor="Status">
          Status:
          <div className="formInputDiv">
            <select id="status" onChange={handleChange}>
              {state.status.map((value, idx) => <option value={idx + 1} key={value}>{ value }</option>)}
            </select>
          </div>
        </label>
        <label htmlFor="thumbnail">
          Thumbnail:
          <div className="formInputDiv">
            <input type="text" placeholder="Enter Thumbnail" id="thumbnail" name="thumbnail" onChange={handleChange} />
          </div>
        </label>
        <label htmlFor="type">
          Type:
          <div className="formInputDiv">
            <select id="type" onChange={handleChange}>
              {state.type.map((value, idx) => <option value={idx + 1} key={value}>{ value }</option>)}
            </select>
          </div>
        </label>
        <div className="formInputDiv">
          <input className="submit" type="submit" value="Submit" onClick={handleClick} />
        </div>
      </div>
    </div>
  );
};

export default Form;
