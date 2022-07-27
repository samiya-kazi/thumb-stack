import { useRef, useEffect } from "react";
import { Circle, Transformer } from "react-konva"

function CircleElement ({ shape, setShapes, isSelected, onSelect }) {

  const shapeRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    if (isSelected) {
      //attaches transformer
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  function handleDragEnd (event) {

    setShapes((prevlist) => {
      const newlist = [...prevlist].filter((listshape) => listshape.id !== shape.id);
      newlist.push({
        ...shape,
        x: event.target.x(),
        y: event.target.y(),
      })

      return newlist;
    })
  }


  function setTransformation () {
    // transformer is changing scale of the node but we want the new width and height to store.
    const node = shapeRef.current;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    // we will reset it back
    node.scaleX(1);
    node.scaleY(1);

    const x = node.x();
    const y = node.y();
    const width = Math.max(5, node.width() * scaleX);
    const height= Math.max(node.height() * scaleY);

    setShapes((prevlist) => {
      const newlist = [...prevlist].filter((listshape) => listshape.id !== shape.id);
      newlist.push({
        ...shape,
        x,
        y,
        width,
        height
      })

      return newlist;
    })

  }

  return (
    <>
    <Circle 
      {...shape}
      onDragEnd={handleDragEnd}
      onClick={onSelect}
      onTap={onSelect}
      ref={shapeRef}
      onTransformEnd={setTransformation}
    />

    {isSelected && (
      <Transformer
        ref={trRef}
        boundBoxFunc={(oldBox, newBox) => {

          // limit resize
          if (newBox.width < 10 || newBox.height < 10) {
            return oldBox;
          }

          return newBox;
        }}
      />
    )}
    </>
  )
}

export default CircleElement