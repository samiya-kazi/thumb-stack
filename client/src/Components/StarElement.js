import { Star } from "react-konva"

function StarElement ({ shape, setShapes }) {

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
    <Star
      id={shape.id}
      key={shape.key}
      x={shape.x}
      y={shape.y}
      numPoints={5} 
      innerRadius={shape.innerRadius}
      outerRadius={shape.outerRadius}
      fill={shape.fill}
      draggable={true}
      onDragEnd={handleDragEnd}
    />
    </>
  )
}

export default StarElement