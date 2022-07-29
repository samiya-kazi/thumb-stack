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
          setErrorMessage('Incorrect login information.')
        } else {
          // This sets isAuthenticated = true and redirects to profile
          console.log(res);
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
          <label>First Name:</label>
          <input type='text' name="firstName" onChange={handleChange} required={true} />
        </div>
        <div>
          <label>Last Name:</label>
          <input type='text' name="lastName" onChange={handleChange} required={true} />
        </div>
        <div>
          <label>E-mail:</label>
          <input type='email' name="email" onChange={handleChange} required={true} />
        </div>
        <div>
          <label>Password:</label>
          <input type='password' name="password" onChange={handleChange} required={true} />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input type='password' name="confirmPassword" onChange={handleChange} required={true} />
        </div>
        <button type="submit">Register</button>
        <div>{errorMessage}</div>
      </form>
    </div>
  )
}

export default Register;