import React, { useState } from 'react';

const Form = () => {
  const [state, setState] = useState({
    
  });

  const handleChange = (e) => {
    setState({ ...state, [e.target.id]: e.target.value });
  };

  const handleClick = () => {

  };

  return (
    <div>
      
    </div>
  );
};

export default Form;
