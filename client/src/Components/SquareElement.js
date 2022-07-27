import { Rect } from "react-konva"

function SquareElement ({ shape, setShapes }) {

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

  return (
    <>
    <Rect
      id={shape.id}
      key={shape.key}
      x={shape.x}
      y={shape.y}
      width={shape.width}
      height={shape.height}
      fill={shape.fill}
      draggable={true}
      onDragEnd = {handleDragEnd}
    />

    </>
  )
}

export default SquareElement