
function SavedThumbnails ({ thumbnails, setSelectedThumbnail }) {

  return (
    <div className="thumbnail-container">
      <h3>Saved Thumbnails</h3>
      {thumbnails.map((thumbnail, key) => {
        return <button key={key} onClick={() => {setSelectedThumbnail(thumbnail)}}>{key}</button>
      })}

    <button key='new' onClick={() => {setSelectedThumbnail(null)}}>New</button>

    </div>
  )
}

export default SavedThumbnails;