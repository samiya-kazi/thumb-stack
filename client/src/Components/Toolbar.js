import { useState } from "react";
import { cldUpload } from "../Services/cloudinary";

function Toolbar ({ setShapes, setBackgroundColor, handleDeleteElement, user }) {

  const [state, setState] = useState({fill: '#000000', opacity: '1', font: 'Calibri'});

  function handleChange (event) {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleBackgroundChange (event) {
    setBackgroundColor(event.target.value)
  }
  


  function getRGBA () {
    const rgbaCol = 'rgba(' + parseInt(state.fill.slice(-6, -4), 16) + ',' + parseInt(state.fill.slice(-4, -2), 16) + ',' + parseInt(state.fill.slice(-2), 16) + ',' + state.opacity + ')';
    return rgbaCol;
  }




  function handleUpload(event) {

    if (user) {
      cldUpload(event, user);
    }

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
        fontFamily: state.font,
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
        <input className='color-picker' type='color' onChange={handleChange} name='fill' />
      </div>

      <div className="full-input">
        <label>Fill Opacity:</label>
        <input type="range" min="0" max="1" step="0.1" onChange={handleChange} className="opacity-range" name='opacity' />
      </div>

      <div className="full-input">
        <label>Font:</label>
        <select onChange={handleChange} className='font-selector' name='font' >
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
      <label className="custom-file-upload">
        <input type="file" id="file_input" onChange={handleUpload}></input>
        Upload Image
      </label>
      <button onClick={handleDeleteElement}>Delete</button>
    </div>
  )
}

export default Toolbar