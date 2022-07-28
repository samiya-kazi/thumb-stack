function TextEditor ({ shapeRef, stage, handleSubmit }) {

  const textPosition = shapeRef.current.absolutePosition();

  const areaPosition = {
    x: stage.container().offsetLeft + textPosition.x,
    y: stage.container().offsetTop + textPosition.y,
  };

  // create textarea and style it
  let textarea = document.createElement('textarea');
  document.body.appendChild(textarea);

  textarea.value = shapeRef.current.text();
  textarea.style.position = 'absolute';
  textarea.style.top = areaPosition.y + 'px';
  textarea.style.left = areaPosition.x + 'px';
  textarea.style.maxWidth = stage.width();
  textarea.style.height = shapeRef.current.height() - shapeRef.current.padding() * 2 + 5 + 'px';
  textarea.style.fontSize = shapeRef.current.fontSize() + 'px';
  textarea.style.border = 'none';
  textarea.style.padding = '0px';
  textarea.style.margin = '0px';
  textarea.style.overflow = 'visible';
  textarea.style.background = 'none';
  textarea.style.outline = 'none';
  textarea.style.resize = 'none';
  textarea.style.lineHeight = shapeRef.current.lineHeight();
  textarea.style.fontFamily = shapeRef.current.fontFamily();
  textarea.style.transformOrigin = 'left top';
  textarea.style.textAlign = shapeRef.current.align();
  textarea.style.color = shapeRef.current.fill();
  let rotation = shapeRef.current.rotation();
  var transform = '';
  if (rotation) {
    transform += 'rotateZ(' + rotation + 'deg)';
  }

  textarea.style.transform = transform;
  textarea.focus();

  textarea.addEventListener('keydown', function (e) {
    // hide on enter
    if (e.keyCode === 13) {
      handleSubmit(textarea.value);
      textarea.remove();
    }
  });

  function handleOutsideClick(e) {
    if (e.target !== textarea) {
      handleSubmit(textarea.value);
      textarea.remove();
    }
  }

  setTimeout(() => {
    window.addEventListener('click', handleOutsideClick);
  });

  return (
    <>
    </>
  )
}


export default TextEditor