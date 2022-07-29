import React, { useState } from 'react';
import auth from '../utils/auth';
import { login } from '../Services/apiService';
import { useNavigate } from 'react-router-dom';

const initialState = {
  email: '',
  password: '',
};

function Login ({ setIsAuth }) {

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

    login(state)
    .then(res => {
      if(!res) {
        setErrorMessage('Incorrect login information.')
      } else {
        // This sets isAuthenticated = true and redirects to profile
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
        <h1>Login</h1>
        <div>
          <label>E-mail:</label>
          <input type='email' onChange={handleChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type='Password' onChange={handleChange} />
        </div>
        <button type="submit">Login</button>
      </form>
      <div>{errorMessage}</div>
    </div>
  )
}

export default Login;