import { useEffect, useRef,useState } from "react";
import { Text, Transformer } from "react-konva"
import TextEditor from "./TextEditor";

function TextElement ({ shape, setShapes, isSelected, onSelect }) {

  const [isEdit, setIsEdit] = useState(false);
  const [stage, setStage] = useState(null);

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
    const fontSize = Math.max(10, node.fontSize() * scaleX);
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
        fontSize,
      })

      return newlist;
    })
  }



  function handleSubmit (text) {
    if(isEdit) {
      setShapes((prevlist) => {
        const newlist = [...prevlist].filter((listshape) => listshape.id !== shape.id);
        newlist.push({
        ...shape,
        text
      })

        return newlist;
      });

      showText();
    }  
  }



  function changeText (e) {
    const stage = e.target.getStage();

    shapeRef.current.hide();
    trRef.current.hide();

    setStage(stage);
    setIsEdit(true);
  }


  
  function showText () {
    if(shapeRef.current && isEdit) {
      shapeRef.current.show();

      if(trRef.current && isEdit) {
        trRef.current.show();
      }
    }

    setIsEdit(false);
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

    {isEdit && (
      <TextEditor 
        shapeRef={shapeRef}
        handleSubmit={handleSubmit}
        stage={stage}
        showText={showText}
        isEdit={isEdit}
      />
    )

    }
    </>
  )
}

export default TextElement