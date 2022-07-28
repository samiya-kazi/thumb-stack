
function SavedThumbnails ({ thumbnails, setSelectedThumbnail }) {

  return (
    <div className="thumbnail-container">
      <h3>Saved Thumbnails</h3>

      <button key='new' onClick={() => {setSelectedThumbnail(null)}}>New</button>

      {thumbnails.map((thumbnail, key) => {
        return <button key={key} onClick={() => {setSelectedThumbnail(thumbnail)}}>{key + 1}</button>
      })}


    </div>
  )
}

export default SavedThumbnails;