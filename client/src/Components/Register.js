import React, { useState } from 'react';
import auth from '../utils/auth';
import { register } from '../Services/apiService';
import { useNavigate } from 'react-router-dom';

const initialState = {
  email: '',
  password: '',
  confirmPassword: '',
  firstName: '',
  lastName: '',
};


function Register ({ setIsAuth }) {

  let navigate = useNavigate();
  const [state, setState] = useState(initialState);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(validateForm()) {
      register(state)
      .then(res => {
        if(!res) {
          setErrorMessage('An account for this e-mail already exists.')
        } else {
          setIsAuth(true);
          auth.login(() => navigate('/dashboard'));
        }
      })
      .catch(err => console.log(err))
    }
  };


  const validateForm = () => {
    if(state.password !== state.confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return false;
    }

    return true;
  };



  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <div>
          <label htmlFor='firstName'>First Name:</label>
          <input id='firstName' type='text' name="firstName" onChange={handleChange} required={true} />
        </div>
        <div>
          <label htmlFor='lastName'>Last Name:</label>
          <input id='lastName' type='text' name="lastName" onChange={handleChange} required={true} />
        </div>
        <div>
          <label htmlFor='email'>E-mail:</label>
          <input id='email' type='email' name="email" onChange={handleChange} required={true} />
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input id='password' type='password' name="password" onChange={handleChange} required={true} />
        </div>
        <div>
          <label htmlFor='confirmPassword'>Confirm Password:</label>
          <input id='confirmPassword' type='password' name="confirmPassword" onChange={handleChange} required={true} />
        </div>
        <button className='form-button'>Register</button>
        <div className='error-message'>{errorMessage}</div>
      </form>
    </div>
  )
}

export default Register;