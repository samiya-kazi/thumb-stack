
function SavedThumbnails ({ thumbnails, setSelectedThumbnail }) {

  return (
    <div className="thumbnail-container">
      <h3>Saved Thumbnails</h3>

      <button key='new' onClick={() => {setSelectedThumbnail(null)}}>New</button>

      {thumbnails && thumbnails.map((thumbnail, key) => {
        return <img src={thumbnail.imageSrc} 
          key={key} 
          onClick={() => {setSelectedThumbnail(thumbnail)}} 
          className='thumbnail-preview'
        />
      })}


    </div>
  )
}

export default SavedThumbnails;