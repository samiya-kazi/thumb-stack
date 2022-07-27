import { useEffect, useRef } from "react";
import { Text, Transformer } from "react-konva"

function TextElement ({ shape, setShapes, isSelected, onSelect }) {

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
    const width = Math.max(10, node.width() * scaleX);
    const height= Math.max(10, node.height() * scaleY);

    setShapes((prevlist) => {
      const newlist = [...prevlist].filter((listshape) => listshape.id !== shape.id);
      newlist.push({
        ...shape,
        x,
        y,
        width,
        height,
      })

      return newlist;
    })
  }

  function handleSubmit (text) {
    setShapes((prevlist) => {
      const newlist = [...prevlist].filter((listshape) => listshape.id !== shape.id);
      newlist.push({
        ...shape,
        text
      })

      return newlist;
    })
    
  }

  function changeText (e) {
    const stage = e.target.getStage();
    const textPosition = stage.getPointerPosition();
    // at first lets find position of text node relative to the stage:

    // then lets find position of stage container on the page:
    var stageBox = stage.container().getBoundingClientRect();

    // so position of textarea will be the sum of positions above:
    var areaPosition = {
      x: stageBox.left + textPosition.x,
      y: stageBox.top + textPosition.y,
    };

    // create textarea and style it
    var textarea = document.createElement('textarea');
    document.body.appendChild(textarea);

    textarea.value = shape.text;
    textarea.style.position = 'absolute';
    textarea.style.top = areaPosition.y + 'px';
    textarea.style.left = areaPosition.x + 'px';
    textarea.style.width = shape.width;

    textarea.focus();

    textarea.addEventListener('keydown', function (e) {
      // hide on enter
      if (e.keyCode === 13) {
        handleSubmit(textarea.value);
        document.body.removeChild(textarea);
      }
    });
  }



  return (
    <>
    <Text
      {...shape}
      onDragEnd={handleDragEnd}
      onClick={onSelect}
      onTap={onSelect}
      ref={shapeRef}
      onTransformEnd={setTransformation}
      onDblClick={changeText}
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

export default TextElement