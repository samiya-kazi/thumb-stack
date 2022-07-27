import { useState } from "react";

function Toolbar ({ setShapes }) {

  const [fillColor, setFillColor] = useState('#000000')

  function handleColorChange (event) {
    setFillColor(event.target.value)
  }


  function addSquare (event) {
    event.preventDefault();

    setShapes((prevlist) => {

      const newId = prevlist.length ? prevlist[prevlist.length - 1].key + 1 : 1;

      const newSquare = {
        type: 'square',
        id:  JSON.stringify(newId),
        key: newId,
        x: 20,
        y: 20,
        width: 50, 
        height: 50, 
        fill: fillColor,
        draggable: true
      }

      return [...prevlist, newSquare]
    })
  }

  function addCircle (event) {
    event.preventDefault();

    
    setShapes((prevlist) => {

      const newId = prevlist.length ? prevlist[prevlist.length - 1].key + 1 : 1;

      const newCircle = {
        type: 'circle',
        id:  JSON.stringify(newId),
        key: newId,
        x: 20,
        y: 20,
        radius: 25, 
        fill: fillColor,
        draggable: true, 
      }

      return [...prevlist, newCircle]
    })
  }


  function addStar (event) {
    event.preventDefault();
    
    setShapes((prevlist) => {

      const newId = prevlist.length ? prevlist[prevlist.length - 1].key + 1 : 1

      const newStar = {
        type: 'star',
        id:  JSON.stringify(newId),
        key: newId,
        x: 20,
        y: 20,
        numPoints: 5, 
        innerRadius: 20,
        outerRadius: 40,
        fill: fillColor,
        draggable: true, 
      }

      return [...prevlist, newStar]
    })
  }



  return (
    <div className="toolbar">
      <label>Select fill color:</label>
      <input type='color' onChange={handleColorChange} />
      <button onClick={addSquare}>Square</button>
      <button onClick={addCircle}>Circle</button>
      <button onClick={addStar}>Star</button>
    </div>
  )
}

export default Toolbar