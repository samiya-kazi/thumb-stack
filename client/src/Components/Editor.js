import { useState } from 'react';
import { Stage, Layer, Rect, Circle } from 'react-konva';
import CircleElement from './CircleElement';
import SquareElement from './SquareElement';
import StarElement from './StarElement';
import Toolbar from './Toolbar';

function Editor () {

  const [shapes, setShapes] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedId(null);
    }
  };

  return (
    <div className='editor'>
      <Toolbar setShapes={setShapes}/>
      <div className='drawing-stage'>
        <Stage width={640} height={350} onMouseDown={checkDeselect} onTouchStart={checkDeselect}>
          <Layer>
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
  )
}

export default Editor