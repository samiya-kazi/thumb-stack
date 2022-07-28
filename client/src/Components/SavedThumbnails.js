
function SavedThumbnails ({ thumbnails, setSelectedThumbnail }) {

  return (
    <div className="thumbnail-container">
      {thumbnails.map((thumbnail, key) => {
        return <button key={key} onClick={() => {setSelectedThumbnail(thumbnail)}}>{key}</button>
      })}

    <button key='clear' onClick={() => {setSelectedThumbnail(null)}}>Clear</button>

    </div>
  )
}

export default SavedThumbnails;