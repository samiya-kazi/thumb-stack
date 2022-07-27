import { Circle } from "react-konva"

function CircleElement ({ shape, setShapes }) {

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
    <Circle 
      id={shape.id}
      key={shape.key}
      x={shape.x}
      y={shape.y}
      radius={shape.radius}
      fill={shape.fill}
      draggable={true}
      onDragEnd={handleDragEnd}
    />
    </>
  )
}

export default CircleElement