import { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Rect } from 'react-konva';
import { deleteThumbnail, saveThumbnail, updateThumbnail } from '../Services/apiService';
import { thumbnailUpload } from '../Services/cloudinary';
import { downloadFromURI, getFileFromUrl } from '../utils/fileConvert';
import { format, parseISO } from 'date-fns';
import ShapeElement from './ShapeElement';
import TextElement from './TextElement';
import Toolbar from './Toolbar';
import Loader from './Loader';

function Editor ({ selectedThumbnail, setSelectedThumbnail, setThumbnails, user }) {

  const [shapes, setShapes] = useState(selectedThumbnail ? selectedThumbnail.elements : []);
  const [selectedId, setSelectedId] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState(selectedThumbnail ? selectedThumbnail.background : '#ffffff');
  const [isLoading, setIsLoading] = useState(false);

  const stageRef = useRef();
  const bgRef = useRef();

  const uriOptions = {mimeType: 'image/png', quality: 0.5};


  useEffect(() => {
    setShapes(selectedThumbnail ? selectedThumbnail.elements : []);
    setBackgroundColor(selectedThumbnail ? selectedThumbnail.background : '#ffffff');
  }, [selectedThumbnail])


  function checkDeselect (e) {
    // deselect when clicked on empty area
    if (e.target === bgRef.current) setSelectedId(null);
  };


  function handleExport () {
    setSelectedId(null);
    const uri = stageRef.current.toDataURL(uriOptions);
    downloadFromURI(uri);
  };


  function handleDeleteElement () {
    if(selectedId) {
      setShapes((prevlist) => prevlist.filter((shape) => shape.id !== selectedId));
      setSelectedId(null);
    }
  }


  async function handlePost () {
    setSelectedId(null);
    setIsLoading(true);

    const uri = stageRef.current.toDataURL(uriOptions);
    
    try {
      const file = await getFileFromUrl(uri);
      const data = await thumbnailUpload(file, user._id);
      let newThumbnail;

      if (selectedThumbnail) {
        newThumbnail = await updateThumbnail(selectedThumbnail._id, shapes, backgroundColor, data.secure_url);
        setThumbnails(prevlist => prevlist.map(tn => tn._id === newThumbnail._id ? newThumbnail : tn));
      } else {
        newThumbnail = await saveThumbnail(shapes, backgroundColor, user._id, data.secure_url);
        setThumbnails(prevlist => [...prevlist, newThumbnail]);
      }
      
      setSelectedThumbnail(newThumbnail);
      setIsLoading(false);
      
    } catch (error) {
      console.log(error);
    }
  }


  async function handleThumbnailDelete () {
    if (selectedThumbnail) {
      await deleteThumbnail(selectedThumbnail._id);
      setThumbnails(prevlist => prevlist.filter(el => el._id !== selectedThumbnail._id));
      setSelectedThumbnail(null);
    }
  }

  function handleOutsideClick (e) {
    if (selectedId && e.target.tagName !== 'CANVAS') setSelectedId(null);
  }
  
  
  function handleKeyPress (e) {
    if (selectedId && e.key === 'Delete') handleDeleteElement();
  }


  setTimeout(() => {
    window.addEventListener('click', handleOutsideClick);
    window.addEventListener('keydown', handleKeyPress);
  });


  return (
    <>
    <div className='editor'>
      <Toolbar 
        setShapes={setShapes} 
        setBackgroundColor={setBackgroundColor}
        handleDeleteElement={handleDeleteElement}
        user={user}
        setIsLoading={setIsLoading}
        />
      <div className='editing-section'>
        <div className='info-loader'>
          <div className='thumbnail-info'>
            <div className='date-info'>{selectedThumbnail ? 
              (<><strong>Created at: </strong> {format(parseISO(selectedThumbnail.createdAt), 'do LLL, yyyy K:mm aaaa')}</>) 
              : null }
            </div>
            <div className='date-info'> {selectedThumbnail ? 
              (<><strong>Last modified: </strong> {format(parseISO(selectedThumbnail.lastModified), 'do LLL, yyyy K:mm aaaa')}</>)
              : null }
            </div>
          </div>
          {isLoading && <Loader />}
        </div>

        <div className='drawing-stage'>
          <Stage width={640} height={350} onMouseDown={checkDeselect} onTouchStart={checkDeselect} ref={stageRef} >
            <Layer>
              <Rect 
                id='background'
                width={640}
                height={350}
                fill={backgroundColor}
                draggable={false}
                ref={bgRef}
                />
              {shapes.map((shape) => {
                switch (shape.type) {
                    case 'text':
                      return <TextElement 
                      shape={shape} 
                      setShapes={setShapes} 
                      key={shape.key} 
                      isSelected={shape.id === selectedId}
                      onSelect={() => {
                        setSelectedId(shape.id);
                      }}
                      />

                    default: 
                      return <ShapeElement 
                      shape={shape} 
                      setShapes={setShapes} 
                      key={shape.key} 
                      isSelected={shape.id === selectedId}
                      onSelect={() => {
                        setSelectedId(shape.id);
                      }}
                      />;
                  }
              })}
            </Layer>
          </Stage>
        </div>
        <div className='resolution'>
          Resolution: 640 x 350
        </div>
        <div className='button-container'>
          <button onClick={handleExport}>Download Image</button>
          <button onClick={handlePost}>{selectedThumbnail ? 'Update Thumbnail' : 'Save Thumbnail' }</button>
          <button onClick={handleThumbnailDelete} className='delete-button'>Delete Thumbnail</button>
        </div>
      </div>
    </div>
    <div>
    </div>
    </>
  )
}

export default Editor