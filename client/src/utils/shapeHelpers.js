import defaultShapes from "./defaultShape.json";

export function getNewShape (type, id, options) {
  const { fill, stroke, opacity, noStroke, font } = options;
  
  const shape = defaultShapes[type];
  shape.id = JSON.stringify(id);
  shape.key = id;
  shape.fill = fill;
  shape.stroke = stroke;
  shape.opacity = parseFloat(opacity);
  shape.strokeWidth = noStroke ? 0 : (type === "text" ? 2 : 4);
  if (type === 'text') shape.fontFamily = font;

  return {...shape};
}


export function generateImage (url, id, orgHeight, orgWidth) {
  const scale = 200 / orgHeight;
  const width = orgWidth * scale;
  const height = 200;

  const img = defaultShapes.image;
  img.id = JSON.stringify(id);
  img.key = id;
  img.imageSrc = url;
  img.height = height;
  img.width = width;

  return {...img};
}