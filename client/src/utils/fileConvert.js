export async function getFileFromUrl(url, name, defaultType = 'image/jpeg'){
  const response = await fetch(url);
  const data = await response.blob();
  return new File([data], name, {
    type: data.type || defaultType,
  });
}


export function downloadFromURI (uri) {
  const link = document.createElement('a');
  link.download = 'stage.png';
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
