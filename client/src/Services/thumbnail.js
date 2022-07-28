
const BASE_URL = 'http://localhost:3001'

export function saveThumbnail (thumbnailElements, backgroundColor) {
  const body = {
    userId: 'user123',
    elements: thumbnailElements,
    background: backgroundColor
  }

  console.log(body);

  const options = {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-type': 'application/json'
    }
  }

  return fetch(`${BASE_URL}/thumbnail`, options)
    .then(response => response.json())
    .catch(err => console.log(err));
}


export function getThumbnails (userId) {
  return fetch(`${BASE_URL}/thumbnail/${userId}`)
    .then(response => response.json())
    .catch(err => console.log(err));
}