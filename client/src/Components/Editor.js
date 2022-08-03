import { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Rect } from 'react-konva';
import { deleteThumbnail, saveThumbnail, updateThumbnail } from '../Services/apiService';
import { thumbnailUpload } from '../Services/cloudinary';
import { getFileFromUrl } from '../utils/fileConvert';
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


  useEffect(() => {
    if (selectedThumbnail) {
      setShapes(selectedThumbnail.elements);
      setBackgroundColor(selectedThumbnail.background);
    } else {
      setShapes([]);
      setBackgroundColor('#ffffff');
    }
  }, [selectedThumbnail])


  function checkDeselect (e) {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === bgRef.current;
    if (clickedOnEmpty) {
      setSelectedId(null);
    }
  };


  function handleExport () {
    setSelectedId(null);

    const uri = stageRef.current.toDataURL({
      mimeType: 'image/png',
      quality: 0.5
    });

    const link = document.createElement('a');
    link.download = 'stage.png';
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  function handleDeleteElement () {
    if(selectedId) {
      setShapes((prevlist) => {
        const newlist = prevlist.filter((shape) => shape.id !== selectedId);
        setSelectedId(null);
        return newlist;
      })
    }
  }

  function handlePost () {

    setSelectedId(null);

    const uri = stageRef.current.toDataURL({
      mimeType: 'image/png',
      quality: 0.5
    });

    setIsLoading(true);

    getFileFromUrl(uri).then((file) => {
      thumbnailUpload(file, user._id).then((data) => {

        setIsLoading(false);

        if (selectedThumbnail) {
          updateThumbnail(selectedThumbnail._id, shapes, backgroundColor, data.public_id, data.version)
            .then((newThumbnail) => {
              setThumbnails(prevlist => {
                const newlist = prevlist.map(tn => {
                  if (tn._id === newThumbnail._id) {
                    tn = {...newThumbnail}
                  }
                  return tn
                });
                return newlist;
              })

              setSelectedThumbnail(newThumbnail);
            })
            .catch(err => console.log(err));
        } else {
          saveThumbnail(shapes, backgroundColor, user._id, data.public_id, data.version)
            .then((newThumbnail) => {
              setThumbnails(prevlist => [...prevlist, newThumbnail]);
              setSelectedThumbnail(newThumbnail);
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
  } 




  function handleThumbnailDelete () {
    if (selectedThumbnail) {
      deleteThumbnail(selectedThumbnail._id)
        .then(() => {
          setThumbnails(prevlist => {
            const newlist = prevlist.filter(el => el._id !== selectedThumbnail._id);
            return newlist;
          })
          setSelectedThumbnail(null);
        });
    }
  }


  function handleOutsideClick (e) {
    if (selectedId && e.target.tagName !== 'CANVAS') {
      setSelectedId(null);
    }
  }


  function handleKeyPress (e) {
    if (selectedId && e.key === 'Delete') {
      handleDeleteElement();
    }
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