import { useState } from "react";

function Toolbar ({ setShapes, setBackgroundColor, handleDeleteElement }) {

  const [fillColor, setFillColor] = useState('#000000');
  const [opacity, setOpacity] = useState('1');
  const [font, setFont] = useState('Calibri');

  function handleColorChange (event) {
    setFillColor(event.target.value)
  }

  function handleBackgroundChange (event) {
    setBackgroundColor(event.target.value)
  }

  function handleFontChange(event) {
    setFont(event.target.value)
  }

  function handleOpacityChange (event) {
    setOpacity(event.target.value);
  }

  function getRGBA () {
    const rgbaCol = 'rgba(' + parseInt(fillColor.slice(-6, -4), 16) + ',' + parseInt(fillColor.slice(-4, -2), 16) + ',' + parseInt(fillColor.slice(-2), 16) + ',' + opacity + ')';
    return rgbaCol;
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
        fill: getRGBA(),
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
        fill: getRGBA(),
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
        fill: getRGBA(),
        draggable: true, 
      }

      return [...prevlist, newStar]
    })
  }


  function addText (event) {
    event.preventDefault();
    
    setShapes((prevlist) => {

      const newId = prevlist.length ? prevlist[prevlist.length - 1].key + 1 : 1;

      const newText = {
        type: 'text',
        id:  JSON.stringify(newId),
        key: newId,
        x: 20,
        y: 20,
        text: 'Add text',
        fontSize: 30,
        fontFamily: font,
        fill: getRGBA(),
        draggable: true, 
      }

      return [...prevlist, newText]
    })
  }




  return (
    <div className="toolbar">
      <h3>Toolbar</h3>
      <div>
        <label>BG:</label>
        <input className='color-picker' type='color' onChange={handleBackgroundChange} defaultValue="#ffffff"/>
      </div>

      <div>
        <label>Fill:</label>
        <input className='color-picker' type='color' onChange={handleColorChange} />
      </div>

      <div className="full-input">
        <label>Fill Opacity:</label>
        <input type="range" min="0" max="1" step="0.1" onChange={handleOpacityChange} className="opacity-range" />
      </div>

      <div className="full-input">
        <label>Font:</label>
        <select onChange={handleFontChange} className='font-selector'>
          <option style={{fontFamily: "Calibri"}}>Calibri</option>
          <option style={{fontFamily: "Georgia"}}>Georgia</option>
          <option style={{fontFamily: "Courier New"}}>Courier New</option>
          <option style={{fontFamily: "Impact"}}>Impact</option>
          <option style={{fontFamily: "Brush Script MT"}}>Brush Script MT</option>
        </select>
      </div>

      <button onClick={addSquare}>Square</button>
      <button onClick={addCircle}>Circle</button>
      <button onClick={addStar}>Star</button>
      <button onClick={addText}>Text</button>
      <button onClick={handleDeleteElement}>Delete</button>
    </div>
  )
}

export default Toolbar