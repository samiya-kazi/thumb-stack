import { useEffect, useState } from 'react';
import { getThumbnails } from '../Services/thumbnail';
import Editor from './Editor';
import SavedThumbnails from './SavedThumbnails';

function Dashboard () {

  const [thumbnails, setThumbnails] = useState([]);
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);

  useEffect(() => {
    getThumbnails('user123')
      .then(data => setThumbnails(data))
      .catch(err => console.log(err));
  }, [])

  return (
    <>
    <SavedThumbnails thumbnails={thumbnails} setSelectedThumbnail={setSelectedThumbnail}/>
    <Editor selectedThumbnail={selectedThumbnail}/>
    </>
  )
}

export default Dashboard;