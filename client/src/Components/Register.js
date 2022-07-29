import React, { useState } from 'react';
import auth from '../utils/auth';
import { register } from '../Services/apiService';
import { useNavigate } from 'react-router-dom';

const initialState = {
  email: '',
  password: '',
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

  };

  const validateForm = () => {
    return !state.email || !state.password;
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <div>
          <label>First Name:</label>
          <input type='text' name="firstName" onChange={handleChange} />
        </div>
        <div>
          <label>Last Name:</label>
          <input type='text' name="lastName" onChange={handleChange}/>
        </div>
        <div>
          <label>E-mail:</label>
          <input type='email' name="email" onChange={handleChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type='password' name="password" onChange={handleChange} />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input type='password' name="confirmPassword" onChange={handleChange} />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default Register;