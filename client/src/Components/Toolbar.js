import { useState } from "react";
import { cldUpload } from "../Services/cloudinary";
import { generateImage, getNewShape } from "../utils/shapeHelpers";

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
    setState((prevState) => ({ ...prevState, [name]: value }));
  }

  function handleBackgroundChange (event) { setBackgroundColor(event.target.value) }

  function handleToggle () {
    setState(prevState => { return {...prevState, noStroke: !state.noStroke} })
  }


  async function handleUpload (event) {
    try {
      if (user) {
        setIsLoading(true);
        const file = event.target.files[0];
        const { secure_url: url, height, width } = await cldUpload(file, user._id);

        setShapes(prevlist => {
          const newId = prevlist.length ? prevlist[prevlist.length - 1].key + 1 : 1;
          const newImg = generateImage(url, newId, height, width);
          return [...prevlist, newImg]
        })

        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }


  function addShapeOrText (type) {
    setShapes((prevlist) => {
      const newId = prevlist.length ? prevlist[prevlist.length - 1].key + 1 : 1;
      const newSquare = getNewShape(type, newId, state);
      return [...prevlist, newSquare]
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

      <button onClick={() => addShapeOrText('square')}>Square</button>
      <button onClick={() => addShapeOrText('circle')}>Circle</button>
      <button onClick={() => addShapeOrText('star')}>Star</button>
      <button onClick={() => addShapeOrText('text')}>Text</button>
      <label className="custom-file-upload">
        <input type="file" id="file_input" accept="image/png, image/jpeg" onChange={handleUpload}></input>
        Upload Image
      </label>
      <button onClick={handleDeleteElement}>Delete</button>
    </div>
  )
}

export default Toolbar