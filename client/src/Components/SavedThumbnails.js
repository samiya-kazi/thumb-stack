
function SavedThumbnails ({ thumbnails, setSelectedThumbnail }) {

  return (
    <div className="thumbnail-container">
      <h3>Saved Thumbnails</h3>

      <button key='new' onClick={() => {setSelectedThumbnail(null)}}>New</button>

      <div className="thumbnail-section">
        {thumbnails && thumbnails.map((thumbnail) => {
          return <img src={thumbnail.imageSrc} 
            key={thumbnail._id} 
            onClick={() => {setSelectedThumbnail(thumbnail)}} 
            className='thumbnail-preview'
            alt={'thumbnail id: ' + thumbnail._id}
          />
        })}
      </div>


    </div>
  )
}

export default SavedThumbnails;