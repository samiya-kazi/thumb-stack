import { useState } from "react";
import { cldUpload } from "../Services/cloudinary";
import { generateImage, getNewShape } from "../utils/shapeHelpers";
import backgroundSVG from '../assets/background.svg';
import fillSVG from '../assets/fill.svg';
import outlineSVG from '../assets/outline.svg';
import squareSVG from '../assets/square.svg';
import circleSVG from '../assets/circle.svg';
import starSVG from '../assets/star.svg';
import textSVG from '../assets/text.svg';
import uploadImageSVG from '../assets/upload-image.svg';
import deleteSVG from '../assets/delete.svg';

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
        <label><img src={backgroundSVG} alt="background color" /></label>
        <input className='color-picker' type='color' onChange={handleBackgroundChange} defaultValue="#ffffff"/>
      </div>

      <div className="color-input">
        <label><img src={fillSVG} alt="fill color" /></label>
        <input className='color-picker' type='color' onChange={handleChange} name='fill' defaultValue="#000000" />
      </div>

      <div className="color-input">
        <label><img src={outlineSVG} alt="outline color" /></label>
        <input className='color-picker' type='color' onChange={handleChange} name='stroke' defaultValue="#000000" disabled={state.noStroke} />
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

      <div className="shape-buttons">
      <button onClick={() => addShapeOrText('square')}><img src={squareSVG} alt="square" /></button>
      <button onClick={() => addShapeOrText('circle')}><img src={circleSVG} alt="circle" /></button>
      <button onClick={() => addShapeOrText('star')}><img src={starSVG} alt="star" /></button>
      <button onClick={() => addShapeOrText('text')}><img src={textSVG} alt="text" /></button>
      <label className="custom-file-upload">
        <input type="file" id="file_input" accept="image/png, image/jpeg" onChange={handleUpload}></input>
        <img src={uploadImageSVG} />
      </label>
      <button onClick={handleDeleteElement}><img src={deleteSVG} /></button>
      </div>
    </div>
  )
}

export default Toolbar