import { useRef, useEffect, useState } from "react";
import { Circle, Image, Rect, Star, Transformer } from "react-konva"

function ShapeElement ({ shape, setShapes, isSelected, onSelect }) {

  const shapeRef = useRef();
  const trRef = useRef();

  const [image, setImage] = useState(null);


  useEffect(() => {
    if (shape.type === 'image') {
      const newImage = new window.Image();
      newImage.src = shape.imageSrc;
      newImage.crossOrigin = 'Anonymous';
      setImage(newImage);
    }
  }, [shape]);

  

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

    let newAttributes = {...shape, x, y, width, height}
    if (shape.type === 'star') {
      const innerRadius = node.innerRadius() * scaleX;
      const outerRadius = node.outerRadius() * scaleX;
      newAttributes = {...newAttributes, innerRadius, outerRadius}
    }

    setShapes((prevlist) => {
      
      const newlist = [...prevlist].filter((listshape) => listshape.id !== shape.id);
      newlist.push(newAttributes);

      return newlist;
    })

  }


  return (
    <>
    {shape.type === 'square' ? 
      (<Rect
        {...shape}
        onDragEnd = {handleDragEnd}
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        onTransformEnd={setTransformation}
      />) 
    : shape.type === 'circle' ? 
      (<Circle
        {...shape}
        onDragEnd = {handleDragEnd}
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        onTransformEnd={setTransformation}
      />)
    : shape.type === 'star' ? 
      (<Star
        {...shape}
        onDragEnd = {handleDragEnd}
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        onTransformEnd={setTransformation}
      />)
  : shape.type === 'image' ? 
    (<Image
      {...shape}
      image={image}
      onDragEnd = {handleDragEnd}
      onClick={onSelect}
      onTap={onSelect}
      ref={shapeRef}
      onTransformEnd={setTransformation}
    />)
  :
    null 
  }
    

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

export default ShapeElement