import { useState } from "react";
import { cldUpload } from "../Services/cloudinary";

function Toolbar ({ setShapes, setBackgroundColor, handleDeleteElement, user, setIsLoading }) {

  const initial_state = {
    fill: '#000000', 
    stroke: '#000000', 
    opacity: 1,
    font: 'Calibri',
    noStroke: false
  }

  const [state, setState] = useState(initial_state);

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

  function handleToggle () {
    setState(prevState => {
      return {...prevState, noStroke: !state.noStroke}
    })
  }
  

  function handleUpload(event) {

    if (user) {
      setIsLoading(true);

      const file = event.target.files[0]
      const file_type = file.name.split('.').at(-1);

      cldUpload(file, user._id)
        .then(data => {
          setIsLoading(false);

          setShapes(prevlist => {
            const newId = prevlist.length ? prevlist[prevlist.length - 1].key + 1 : 1;

            const scale = 200 / data.height;
            const width = data.width * scale;
            const height = 200;
  
            const newImg = {
              type: 'image',
              id:  JSON.stringify(newId),
              key: newId,
              imageSrc: process.env.REACT_APP_CLOUD_IMAGE_BASE_URL + '/v' + data.version + '/' + data.public_id + '.' + file_type,
              x: 20,
              y: 20,
              height,
              width,
              rotate: 0,
              draggable: true, 
            }

            return [...prevlist, newImg]
            
          })
        })
        .catch(err => console.log(err));
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
        fill: state.fill,
        stroke: state.stroke,
        opacity: parseFloat(state.opacity),
        strokeWidth: (state.noStroke ? 0 : 4),
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
        fill: state.fill,
        stroke: state.stroke,
        opacity: parseFloat(state.opacity),
        strokeWidth: (state.noStroke ? 0 : 4),
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
        fill: state.fill,
        stroke: state.stroke,
        opacity: parseFloat(state.opacity),
        strokeWidth: (state.noStroke ? 0 : 4),
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
        fill: state.fill,
        stroke: state.stroke,
        opacity: parseFloat(state.opacity),
        strokeWidth: (state.noStroke ? 0 : 2),
        draggable: true, 
      }

      return [...prevlist, newText]
    })
  }




  return (
    <div className="toolbar">
      <h3>Toolbar</h3>
      <div className="color-input">
        <label>BG:</label>
        <input className='color-picker' type='color' onChange={handleBackgroundChange} defaultValue="#ffffff"/>
      </div>

      <div className="color-input">
        <label>Fill:</label>
        <input className='color-picker' type='color' onChange={handleChange} name='fill' defaultValue="#000000" />
      </div>

      <div className="color-input">
        <label>Stroke:</label>
        <input className='color-picker' type='color' onChange={handleChange} name='stroke' defaultValue="#000000" />
      </div>

      <div className="color-input">
        <input type="checkbox" name="noStroke" value="noStroke" checked={state.noStroke} 
          onChange={handleToggle} />
        <label>No stroke</label>
      </div>

      <div className="full-input">
        <label>Opacity:</label>
        <input type="range" min="0" max="1" step="0.1" onChange={handleChange} className="opacity-range" name='opacity' />
      </div>

      <div className="full-input">
        <label>Font:</label>
        <select onChange={handleChange} className='font-selector' name='font' >
          <option style={{fontFamily: "Calibri"}}>Calibri</option>
          <option style={{fontFamily: "Georgia"}}>Georgia</option>
          <option style={{fontFamily: "Courier New"}}>Courier New</option>
          <option style={{fontFamily: "Comic Sans MS"}}>Comic Sans MS</option>
          <option style={{fontFamily: "Impact"}}>Impact</option>
          <option style={{fontFamily: "Brush Script MT"}}>Brush Script MT</option>
        </select>
      </div>

      <button onClick={addSquare}>Square</button>
      <button onClick={addCircle}>Circle</button>
      <button onClick={addStar}>Star</button>
      <button onClick={addText}>Text</button>
      <label className="custom-file-upload">
        <input type="file" id="file_input" accept="image/png, image/jpeg" onChange={handleUpload}></input>
        Upload Image
      </label>
      <button onClick={handleDeleteElement}>Delete</button>
    </div>
  )
}

export default Toolbar