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
    <>
      <h1>{`Hello, ${user ? user.firstName : 'New'} ${user ? user.lastName : 'User'}`} </h1>
    </>
  )
}

export default Home;