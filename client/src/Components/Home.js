import { useEffect, useState } from 'react';
import { getUserInfo } from '../Services/apiService';
import { Link } from 'react-router-dom';

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
          <h2>Need a thumbnail for your video? <br></br>Create and store your thumbnails for <br></br>easy access and editing! </h2>
          {!user ? (
            <div className='home-buttons-container'>
              <Link to='/login'>
                <button className='home-button'><span>Login </span></button>
              </Link>
              <Link to='/register'>
                <button className='home-button'><span>Register </span></button>
              </Link>
            </div>) : null}
        </div>

        <div className='previews'>
          <div className='thumbnail-portfolio'>
            <img 
              src='https://res.cloudinary.com/dmpn6t2jn/image/upload/v1659432160/thumbail-portfolio/stage_4_oemsc0.png'
              className='portfolio-img'
              alt='Programming thumbnail' />
          </div>
          <div className='thumbnail-portfolio'>
            <img 
              src='https://res.cloudinary.com/dmpn6t2jn/image/upload/v1659432158/thumbail-portfolio/stage_5_al9u2s.png'
              className='portfolio-img'
              alt='Recipe thumbnail' />
          </div>
          <div className='thumbnail-portfolio'>
            <img 
              src='https://res.cloudinary.com/dmpn6t2jn/image/upload/v1659432160/thumbail-portfolio/stage_3_brnubo.png'
              className='portfolio-img'
              alt='Vacation thumbnail' />

          </div>
          <div className='thumbnail-portfolio'>
            <img 
                src='https://res.cloudinary.com/dmpn6t2jn/image/upload/v1659432158/thumbail-portfolio/stage_6_mfu8to.png'
                className='portfolio-img'
                alt='Deltarune thumbnail' />

          </div>

        </div>

      </div>
    </div>
  )
}

export default Home;