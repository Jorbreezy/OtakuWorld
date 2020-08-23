/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import CustomStyle from '../selectStyles';
import './styles/form.css';
import apiRequest from '../Authentication/apiRequest';

const AddManga = () => {
  const [state, setState] = useState({
    manga: {
      title: '',
      description: '',
      author: '',
      chapters: 0,
      status: 0,
      thumbnail: '',
      type: 1,
    },
    type: ['Manga', 'Webtoon', 'Manhua'],
    status: ['Completed', 'Ongoing'],
    genre: [],
  });

  const [genres, setGenre] = useState([]);
  const [status, setStatus] = useState(0);
  const [type, setType] = useState(0);

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
      thumbnail,
    } = state.manga;

    apiRequest('/api/manga/add', {
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
        genres,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          alert('Added Successfully');
        }
      })
      .catch((err) => console.error(err));
  };

  const getGenre = () => {
    apiRequest('/api/manga/genre')
      .then((res) => res.json())
      .then((res) => {
        setState({ ...state, genre: res });
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getGenre();
  }, []);

  const options = state.genre.map(({ genre: label, id: value }) => ({ label, value }));
  const statusOptions = state.status.map((value, key) => ({ value: key + 1, label: value }));
  const typeOptions = state.type.map((value, key) => ({ value: key + 1, label: value }));

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
          <div className="formInputDiv rSelect">
            <Select
              options={statusOptions}
              onChange={(e) => setStatus(e.value)}
              styles={CustomStyle}
            />
          </div>
        </label>
        <label htmlFor="Genre">
          Genre:
          <div className="formInputDiv rSelect">
            <Select
              options={options}
              isMulti
              isSearchable
              onChange={setGenre}
              styles={CustomStyle}
            />
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
          <div className="formInputDiv rSelect">
            <Select
              options={typeOptions}
              onChange={(e) => setType(e.value)}
              styles={CustomStyle}
            />
          </div>
        </label>
        <div className="formInputDiv">
          <input className="submit" type="submit" value="Submit" onClick={handleClick} />
        </div>
      </div>
    </div>
  );
};

export default AddManga;
