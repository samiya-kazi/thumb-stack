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
    const textPosition = shapeRef.current.absolutePosition();

    shapeRef.current.hide();
    trRef.current.hide();

    const areaPosition = {
      x: stage.container().offsetLeft + textPosition.x,
      y: stage.container().offsetTop + textPosition.y,
    };

    // create textarea and style it
    var textarea = document.createElement('textarea');
    document.body.appendChild(textarea);

    textarea.value = shapeRef.current.text();
        textarea.style.position = 'absolute';
        textarea.style.top = areaPosition.y + 'px';
        textarea.style.left = areaPosition.x + 'px';
        // textarea.style.width = shapeRef.current.width() - shapeRef.current.padding() * 2 + 'px';
        textarea.style.maxWidth = stage.width();
        textarea.style.height =
          shapeRef.current.height() - shapeRef.current.padding() * 2 + 5 + 'px';
        textarea.style.fontSize = shapeRef.current.fontSize() + 'px';
        textarea.style.border = 'none';
        textarea.style.padding = '0px';
        textarea.style.margin = '0px';
        textarea.style.overflow = 'visible';
        textarea.style.background = 'none';
        textarea.style.outline = 'none';
        textarea.style.resize = 'none';
        textarea.style.lineHeight = shapeRef.current.lineHeight();
        textarea.style.fontFamily = shapeRef.current.fontFamily();
        textarea.style.transformOrigin = 'left top';
        textarea.style.textAlign = shapeRef.current.align();
        textarea.style.color = shapeRef.current.fill();
        let rotation = shapeRef.current.rotation();
        var transform = '';
        if (rotation) {
          transform += 'rotateZ(' + rotation + 'deg)';
        }

    textarea.focus();

    textarea.addEventListener('keydown', function (e) {
      // hide on enter
      if (e.keyCode === 13) {
        handleSubmit(textarea.value);
        document.body.removeChild(textarea);
        shapeRef.current.show();
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