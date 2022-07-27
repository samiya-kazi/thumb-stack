import { useState, useRef } from 'react';
import { Stage, Layer, Rect } from 'react-konva';
import CircleElement from './CircleElement';
import SquareElement from './SquareElement';
import StarElement from './StarElement';
import Toolbar from './Toolbar';

function Editor () {

  const [shapes, setShapes] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState('white');

  const stageRef = useRef();
  const bgRef = useRef();

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


  return (
    <>
    <div className='editor'>
      <Toolbar setShapes={setShapes} setBackgroundColor={setBackgroundColor}/>
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
                case 'square':
                  return <SquareElement 
                    shape={shape} 
                    setShapes={setShapes} 
                    key={shape.key} 
                    isSelected={shape.id === selectedId}
                    onSelect={() => {
                      setSelectedId(shape.id);
                    }}
                    />

                case 'circle':
                  return <CircleElement 
                    shape={shape} 
                    setShapes={setShapes} 
                    key={shape.key} 
                    isSelected={shape.id === selectedId}
                    onSelect={() => {
                      setSelectedId(shape.id);
                    }}
                    />

                case 'star':
                  return <StarElement 
                    shape={shape} 
                    setShapes={setShapes} 
                    key={shape.key} 
                    isSelected={shape.id === selectedId}
                    onSelect={() => {
                      setSelectedId(shape.id);
                    }}
                    />

                default: return null;
              }
            })}
          </Layer>
        </Stage>
      </div>
    </div>
    <div>
      <button onClick={handleExport}>Save Image</button>
    </div>
    </>
  )
}

export default Editor