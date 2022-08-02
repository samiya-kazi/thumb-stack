import { useEffect, useState } from 'react';
import { getUserInfo } from '../Services/apiService';

function Home ({ isAuth }) {

  const [user, setUser] = useState(null);

  useEffect(() => {
    if (isAuth) {
      getUserInfo()
        .then(user => setUser(user))
        .catch(err => console.log(err));
    } else {
      setUser(null);
    }
  }, [isAuth]);

  return (
    <div className='hero-container'>
      <h1>{user ? 'Welcome back, ' + user.firstName + ' ' + user.lastName + '!'
        : 'Get started with ThumbStack!'}</h1>

      <div className='hero-info-container'>
        <div className='hero-info'>

        </div>

        <div className='previews'>

        </div>

      </div>
    </div>
  )
}

export default Home;