import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getThumbnails, getUserInfo } from '../Services/apiService';
import Editor from './Editor';
import SavedThumbnails from './SavedThumbnails';

function Dashboard ({ isAuth }) {
  let navigate = useNavigate();

  const [thumbnails, setThumbnails] = useState([]);
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (isAuth) {
      getUserInfo()
        .then(user => {
          setUser(user);
          getThumbnails(user._id)
            .then(data => setThumbnails(data))
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    } else {
      navigate('/');
    }
  }, [isAuth]);


  return (
    <>
    <SavedThumbnails thumbnails={thumbnails} setSelectedThumbnail={setSelectedThumbnail} />
    <Editor selectedThumbnail={selectedThumbnail} setThumbnails={setThumbnails} user={user} />
    </>
  )
}

export default Dashboard;