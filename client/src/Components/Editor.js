import { useState } from 'react';
import { Stage, Layer, Rect, Circle } from 'react-konva';
import CircleElement from './CircleElement';
import SquareElement from './SquareElement';
import StarElement from './StarElement';
import Toolbar from './Toolbar';

function Editor () {

  const [shapes, setShapes] = useState([]);

  return (
    <div className='editor'>
      <Toolbar setShapes={setShapes}/>
      <div className='drawing-stage'>
        <Stage width={640} height={350}>
          <Layer>
            {shapes.map((shape) => {
              switch (shape.type) {
                case 'square':
                  return <SquareElement shape={shape} setShapes={setShapes} key={shape.key} />
                case 'circle':
                  return <CircleElement shape={shape} setShapes={setShapes} key={shape.key} />
                case 'star':
                  return <StarElement shape={shape} setShapes={setShapes} key={shape.key} />
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