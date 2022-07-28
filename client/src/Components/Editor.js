import { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Rect } from 'react-konva';
import { saveThumbnail, updateThumbnail } from '../Services/thumbnail';
import ShapeElement from './ShapeElement';
import TextElement from './TextElement';
import Toolbar from './Toolbar';

function Editor ({ selectedThumbnail, setThumbnails }) {

  const [shapes, setShapes] = useState(selectedThumbnail ? selectedThumbnail.elements : []);
  const [selectedId, setSelectedId] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState(selectedThumbnail ? selectedThumbnail.background : '#ffffff');

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


  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === bgRef.current;
    if (clickedOnEmpty) {
      setSelectedId(null);
    }
  };


  const handleExport = () => {
    setSelectedId(null);
    
    const uri = stageRef.current.toDataURL();
    let link = document.createElement('a');
    link.download = 'stage.png';
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  const handleDeleteElement = () => {
    if(selectedId) {
      setShapes((prevlist) => {
        const newlist = prevlist.filter((shape) => shape.id !== selectedId);
        setSelectedId(null);
        return newlist;
      })
    }
  }

  const handlePost = () => {
    if (selectedThumbnail) {
      updateThumbnail(selectedThumbnail._id, shapes, backgroundColor)
        .then((newThumbnail) => {
          setThumbnails(prevlist => {
            const newlist = prevlist.map(tn => {
              if(tn._id === newThumbnail._id) {
                tn = {...newThumbnail}
              }
              return tn
            });
            return newlist;
          })
        });
    } else {
      saveThumbnail(shapes, backgroundColor)
        .then((newThumbnail) => {
          setThumbnails(prevlist => [...prevlist, newThumbnail])
        });
    }


  } 


  return (
    <>
    <div className='editor'>
      <Toolbar 
        setShapes={setShapes} 
        setBackgroundColor={setBackgroundColor}
        handleDeleteElement={handleDeleteElement}
        />
      <div>
        <div className='drawing-stage'>
          <Stage width={640} height={350} onMouseDown={checkDeselect} onTouchStart={checkDeselect} ref={stageRef}>
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
        <div>
          640 x 350
        </div>
        <div className='button-container'>
          <button onClick={handleExport}>Download Image</button>
          <button onClick={handlePost}>{selectedThumbnail ? 'Update' : 'Save' }</button>
        </div>
      </div>
    </div>
    <div>
    </div>
    </>
  )
}

export default Editor