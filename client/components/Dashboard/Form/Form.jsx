/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import '../../styles/form.css';
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
      type: 1,
    },
    type: ['Manga', 'Webtoon', 'Manhua'],
    status: ['Completed', 'Ongoing'],
    genre: [],
  });

  const [genreArr, setGenre] = useState([]);
  const [statusObj, setStatus] = useState({});
  const [typeObj, setType] = useState({});

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

    const gArr = genreArr.map((obj) => obj.value).join(',');

    apiRequest('/manga/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        description,
        author,
        chapters,
        status: statusObj.value,
        thumbnail,
        type: typeObj.value,
        genre: gArr,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          alert('Added Successfully');
        }
      })
      .catch((err) => console.log(err));
  };

  const getGenre = () => {
    apiRequest('/manga/genre')
      .then((res) => res.json())
      .then((res) => {
        setState({ ...state, genre: res });
        return 0;
      })
      .catch((err) => console.log(err));
  };

  console.log('GenreArr: ', state.genre);

  useEffect(() => {
    getGenre();
  }, []);

  const options = state.genre.map(({ genre: label, id: value }) => ({ label, value }));
  const statusOptions = state.status.map((value, key) => ({ value: key + 1, label: value }));
  const typeOptions = state.type.map((value, key) => ({ value: key + 1, label: value }));

  const CustomStyle = {
    control: (styles) => ({
      ...styles, backgroundColor: '#60728b', border: '#60728b', color: '#bbe1fa',
    }),
    menu: (styles) => ({ ...styles, backgroundColor: '#60728b', color: '#bbe1fa' }),
    option: (styles, {
      isDisabled, isFocused,
    }) => {
      const color = '#6699cc';
      return {
        ...styles,
        backgroundColor: isFocused ? color : '#60728b',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        color: '#bbe1fa',
      };
    },
    placeholder: (defaultStyles) => ({
      ...defaultStyles,
      color: '#bbe1fa',
    }),
    singleValue: (styles) => ({ ...styles, color: '#bbe1fa' }),
    multiValue: (styles) => ({
      ...styles,
      backgroundColor: '#8999ae',
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: data.color,
      ':hover': {
        backgroundColor: '#ae8999',
        color: '#996b7f',
      },
    }),
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
          <div className="formInputDiv rSelect">
            <Select options={statusOptions} onChange={setStatus} styles={CustomStyle} />
          </div>
        </label>
        <label htmlFor="Genre">
          Genre:
          <div className="formInputDiv rSelect">
            <Select options={options} isMulti isSearchable onChange={setGenre} styles={CustomStyle} />
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
              onChange={setType}
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

export default Form;
